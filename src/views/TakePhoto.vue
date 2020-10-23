<template lang="pug">
video.video.mb-7(
  :class="facingMode === 'user' ? 'front' : ''"
  ref='video'
)
canvas(
  style='display: none'
  ref='canva'
)
</template>