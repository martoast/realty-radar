<template>
    <div>
      <slot />
    </div>
  </template>
  
  <script setup>
  import { useHead } from '#app'
  
  useHead({
    htmlAttrs: {
      class: 'h-full bg-white'
    },
    bodyAttrs: {
      class: 'h-full'
    }
  })
  </script>