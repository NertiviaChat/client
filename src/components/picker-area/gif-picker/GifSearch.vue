<template>
  <div class="searches">
    <div
      class="item"
      v-for="(item, i) in items"
      :key="i"
      @click="onClick(item.siteUrl)"
    >
      <video
        class="video"
        :src="item.url"
        autoplay
        loop
        v-if="isWindowFocus"
      ></video>
      <img class="image" v-else :src="item.preview" alt="" loading="lazy" />
    </div>
  </div>
</template>

<script lang="ts">
import { TenorSearch } from "@/services/tenorService";
import { defineComponent, PropType, ref, onMounted, onBeforeUnmount } from "@vue/runtime-core";
import { insert } from "text-field-edit";

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<TenorSearch[]>,
      required: true,
    },
    inputElement: {
      type: Object as PropType<HTMLTextAreaElement>,
      required: true,
    },
  },
  data() {
    return {
      isFocused: ref(true),
    };
  },
  methods: {
    onClick(url: string) {
      insert(this.inputElement, url + " ");
      this.inputElement.focus();
      this.$emit("close");
    },
    handleWindowFocus() {
      this.isFocused = true;
    },
    handleWindowBlur() {
      this.isFocused = false;
    },
  },
  mounted() {
    window.addEventListener("focus", this.handleWindowFocus);
    window.addEventListener("blur", this.handleWindowBlur);
  },
  beforeUnmount() {
    window.removeEventListener("focus", this.handleWindowFocus);
    window.removeEventListener("blur", this.handleWindowBlur);
  },
  computed: {
    isWindowFocus() {
      return this.isFocused;
    },
  },
});
</script>

<style lang="scss" scoped>
.searches {
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  gap: 5px;
  margin-top: 5px;
  margin-left: 5px;
}
.item {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  overflow: hidden;
  height: 100px;
  width: 178px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .image {
    z-index: 1;
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: relative;
  }
  .video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
