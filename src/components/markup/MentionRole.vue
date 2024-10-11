<template>
  <span
    class="outer-mention"
    @click="showRoleProfile"
    @contextmenu.prevent="roleContext"
  >
    <AvatarImage :imageId="role.icon" :seedId="role.id" size="20px" />
    <Mention :text="display" />
  </span>
</template>

<script lang="ts">
import { PropType } from "vue";
import ServerRole from "@/interfaces/ServerRole";
import Mention from "./Mention.vue";
import AvatarImage from "@/components/AvatarImage.vue";
import { PopoutsModule } from "@/store/modules/popouts";
import { ServerMembersModule } from "@/store/modules/serverMembers";

import { defineComponent } from "vue";
export default defineComponent({
  components: { Mention, AvatarImage },
  props: {
    role: {
      type: Object as PropType<ServerRole>,
      required: true,
    },
  },
  computed: {
    display() {
      return `${this.role.name}`;
    },
  },
  methods: {
    roleContext(event: MouseEvent) {
      PopoutsModule.ShowPopout({
        id: "context",
        component: "RoleContextMenu",
        key: this.role.id + event.clientX + event.clientY,
        data: {
          tempRole: this.role,
          x: event.clientX,
          y: event.clientY,
          id: this.role.id,
        },
      });
    },
    showRoleProfile(event: PointerEvent) {
      PopoutsModule.ShowPopout({
        id: "roleProfile",
        component: "RoleProfilePopout", 
        data: {
          x: event.x,
          y: event.y,
          role: this.role,
        },
      });
    },
  },
});
</script>

<style>
.outer-mention {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  vertical-align: -5px;
}
.outer-mention .avatar {
  margin-right: 2px;
}
.outer-mention .avatar .image {
  border: 0;
}
.outer-mention .mention {
  line-height: 1.1;
}
.outer-mention:hover > .mention {
  text-decoration: underline;
}
</style>
