<template>
    <div>
        shit
        <MultiSelect
          v-model="form.foreclosure_status"
          :options="[
            { value: '', label: 'Any' },
            { value: 'pre_foreclosure', label: 'Pre-Foreclosure' },
            { value: 'auction', label: 'Auction' },
            { value: 'bank_owned', label: 'Bank Owned' }
          ]"
          :multiple="false"
        />
    </div>
</template>

<script setup>

const form = ref({
  owner_type: [],
  purchase_date_min: '',
  purchase_date_max: '',
  years_owned_min: null,
  years_owned_max: null,
  purchase_price_min: null,
  purchase_price_max: null,
  absentee_owner: [],
  occupancy: [],
  foreclosure_status: '',
});
</script>