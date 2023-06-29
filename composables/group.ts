import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGroupStore = defineStore('group', () => {
  const { $api } = useNuxtApp()

  const groups = ref<Group[]>([])

  /**
   * init populates the store with groups available in iNProve and does nothing
   * if the user is unauthenticated.
   *
   * init should be called in any root level layout (example: layouts/app.vue)
   */
  async function init(cookie?: string) {
    try {
      const res = await $api<Group[]>('/groups', {
        headers: cookie
          ? {
              cookie,
            }
          : undefined,
      })
      groups.value = res
    }
    catch (e) {
      console.error('[composables/group.ts] failed to init store', e)
      return parseError(e)
    }
  }

  /**
   * create a new group
   *
   * @param name name of the group
   * @param shortName short name of the group, must be alphanumeric (incl. dashes)
   * @param description description of group
   * @returns ValidationError | undefined
   */
  async function create(name: string, shortName: string, description: string) {
    try {
      const res = await $api<Group>('/groups', {
        method: 'POST',
        body: {
          name,
          shortName,
          description,
        },
      })
      groups.value.push(res)
    }
    catch (e) {
      console.error('[composables/groups.ts] failed to create group', e)
      return parseError(e)
    }
  }

  /**
   * update a group
   *
   * @param prevshortName short name of the previous group used to update all information
   * @param name name of the group
   * @param shortName short name of the group, must be alphanumeric (incl. dashes)
   * @param description description of group
   * @returns ValidationError | undefined
   */
  async function update(prevshortName: string, name: string, shortName: string, description: string) {
    try {
      const res = await $api<Group>(`/groups/${prevshortName}`, {
        method: 'PUT',
        body: {
          name,
          shortName,
          description,
        },
      })
      const idx = groups.value.findIndex(i => i.shortName === prevshortName)
      if (idx === -1)
        throw new Error('invariant')

      groups.value[idx] = res
    }
    catch (e) {
      console.error('[composables/groups.ts] failed to update group', e)
      return parseError(e)
    }
  }

  /**
   * delete a group
   * please be careful, this also deletes all resources belonging to the group
   *
   * @param shortName short name of the group to delete
   * @returns ValidationError | undefined
   */
  async function del(shortName: string) {
    try {
      await $api<Group>(`/groups/${shortName}`, {
        method: 'DELETE',
      })

      groups.value = groups.value.filter(groups => groups.shortName !== shortName)
    }
    catch (e) {
      console.error('[composables/groups.ts] failed to delete group', e)
      return parseError(e)
    }
  }

  return {
    groups,

    init,
    create,
    update,
    del,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
