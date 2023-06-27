import { acceptHMRUpdate, defineStore } from 'pinia'

export const useInstitutionStore = defineStore('institution', () => {
  const { $api } = useNuxtApp()

  const institutions = ref<Institution[]>([])
  const invites = ref<Record<string, InstitutionInviteLink[]>>({})

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
   * @param principal short name of the institution
   * @param name name of the institution
   * @param shortName new short name of the institution, must be alphanumeric (incl. dashes)
   * @param description description of institution
   * @returns ValidationError | undefined
   */

  async function update(principal: string, name: string, shortName: string, description: string) {
    try {
      const res = await $api<Institution>(`/institutions/${principal}`, {
        method: 'PUT',
        body: {
          name,
          shortName,
          description,
        },
      })
      const idx = institutions.value.findIndex(i => i.shortName === principal)
      if (idx === -1)
        throw new Error('invariant')

      institutions.value[idx] = res
    }
    catch (e) {
      console.error('[composables/institution.ts] failed to update institution', e)
      return parseError(e)
    }
  }

  /**
   * loadInvites populates the invites value on demand for a given institution
   *
   * @param shortName short name of the institution
   * @returns ValidationError | undefined
   */
  async function loadInvites(shortName: string) {
    try {
      const res = await $api<InstitutionInviteLink[]>(`/institutions/${shortName}/invites`)
      invites.value[shortName] = res
    }
    catch (err) {
      console.error('[composables/institution.ts] failed to load invites', err)
      return parseError(err)
    }
  }

  async function createInvite(shortName: string, role: string) {
    try {
      const res = await $api<InstitutionInviteLink>(`/institutions/${shortName}/invites`, {
        method: 'POST',
        body: {
          role,
        },
      })
      invites.value[shortName].push(res)
    }
    catch (e) {
      console.error('[composables/institution.ts] failed to create invite', e)
      return parseError(e)
    }
  }

  async function delInvite(shortName: string, code: string) {
    try {
      await $api<InstitutionInviteLink>(`/institutions/${shortName}/invites/${code}`, {
        method: 'DELETE',
      })

      invites.value[shortName] = invites.value[shortName].filter(v => v.code !== code)
    }
    catch (err) {
      console.error('[composables/institution.ts] failed to create invite', err)
      return parseError(err)
    }
  }

  return {
    institutions,
    invites,

    init,
    create,
    del,
    update,

    loadInvites,
    createInvite,
    delInvite,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
