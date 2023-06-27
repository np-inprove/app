<script setup lang="ts">
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'

definePageMeta({
  layout: 'app',
  middleware: 'god-mode',
})

const route = useRoute()
const institution = useInstitutionStore()

onMounted(async () => {
  await institution.loadInvites(route.params.shortName as string)
})

const invitesData = computed(() => {
  return institution.invites[route.params.shortName as string] ?? []
})

const institutionData = computed(() => {
  return institution.institutions.find(inst => inst.shortName === route.params.shortName)
})
</script>

<template>
  <div>
    <div v-if="!institutionData">
      <h3 text-xl font-semibold>
        Institution not found
      </h3>
    </div>

    <div v-else>
      <h3 text-lg font-semibold>
        <span>
          Edit {{ institutionData.name }}
        </span>
      </h3>

      <TabView>
        <TabPanel header="Info">
          <AdminInstitutionInfoForm :institution="institutionData" />
        </TabPanel>
        <TabPanel header="Invites">
          <AdminInstitutionInvitesForm :invites="invitesData" :short-name="institutionData.shortName" />
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>
