import { acceptHMRUpdate, defineStore } from 'pinia'

interface Institution {
  id: number
  name: string
  short_name: string
  admin_domain: string
  student_domain: string
}

export const useGodStore = defineStore('god', () => {
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
      const res = await $api<Institution[]>('/god/institutions', {
        headers: cookie
          ? {
              cookie,
            }
          : undefined,
      })
      institutions.value = res
    }
    catch (e) {
      console.error('[composables/god.ts] failed to init store', e)
      return parseError(e)
    }
  }

  /**
   * create a new institution
   *
   * @param name name of the institution
   * @param shortName short name of the institution, must be alphanumeric (incl. dashes)
   * @param adminDomain fqdn of admin email addresses
   * @param studentDomain fqdn of student email addresses
   * @returns ValidationError | undefined
   */
  async function create(name: string, shortName: string, adminDomain: string, studentDomain: string) {
    try {
      const res = await $api<Institution>('/god/institutions', {
        method: 'POST',
        body: {
          name,
          short_name: shortName,
          admin_domain: adminDomain,
          student_domain: studentDomain,
        },
      })
      institutions.value.push(res)
    }
    catch (e) {
      console.error('[composables/god.ts] failed to create institution', e)
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
      await $api<Institution>(`/god/institutions/${shortName}`, {
        method: 'DELETE',
      })
      institutions.value = institutions.value.filter(({ short_name }) => short_name !== shortName)
    }
    catch (e) {
      console.error('[composables/god.ts] failed to delete institution', e)
      return parseError(e)
    }
  }

  return {
    institutions,

    init,
    create,
    del,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGroupStore, import.meta.hot))
