import { acceptHMRUpdate, defineStore } from 'pinia'

export const useInstitutionStore = defineStore('institution', () => {
  const { $api } = useNuxtApp()

  const institutions = ref<Institution[]>([])

  /**
   * init populates the store with institutions available in iNProve and does nothing
   * if the user is unauthenticated.
   *
   * init should be called in any root level layout (example: layouts/app.vue)
   */
  async function init(cookie?: string) {
    try {
      const res = await $api<Institution[]>('/institutions', {
        headers: cookie
          ? {
              cookie,
            }
          : undefined,
      })
      institutions.value = res
    }
    catch (e) {
      console.error('[composables/institution.ts] failed to init store', e)
      return parseError(e)
    }
  }

  /**
   * create a new institution
   *
   * @param name name of the institution
   * @param shortName short name of the institution, must be alphanumeric (incl. dashes)
   * @param description description of institution
   * @returns ValidationError | undefined
   */
  async function create(name: string, shortName: string, description: string) {
    try {
      const res = await $api<Institution>('/institutions', {
        method: 'POST',
        body: {
          name,
          shortName,
          description,
        },
      })
      institutions.value.push(res)
    }
    catch (e) {
      console.error('[composables/institution.ts] failed to create institution', e)
      return parseError(e)
    }
  }

  /**
   * delete an institution
   * please be careful, this also deletes all resources belonging to the institution
   *
   * @param shortName short name of the institution to delete
   * @returns ValidationError | undefined
   */
  async function del(shortName: string) {
    try {
      await $api<Institution>(`/institutions/${shortName}`, {
        method: 'DELETE',
      })

      institutions.value = institutions.value.filter(inst => inst.shortName !== shortName)
    }
    catch (e) {
      console.error('[composables/institution.ts] failed to delete institution', e)
      return parseError(e)
    }
  }

  /**
   * update an existing institution
   *
   * @param name name of the institution
   * @param shortName short name of the institution, must be alphanumeric (incl. dashes)
   * @param description description of institution
   * @returns ValidationError | undefined
   */

  async function update(name: string, shortName: string, description: string) {
    try {
      const res = await $api<Institution>(`/institutions/${shortName}`, {
        method: 'PUT',
        body: {
          name,
          shortName,
          description,
        },
      })
      institutions.value.push(res)
    }
    catch (e) {
      console.error('[composables/institution.ts] failed to create institution', e)
      return parseError(e)
    }
  }

  return {
    institutions,

    init,
    create,
    del,
    update,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
