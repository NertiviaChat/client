<template>
  <div class="apply-server-verify">
    <Header />
    <div class="content">
      <div class="title">Apply for Server Verification</div>
      <div class="updated-date">Last updated: Friday 11 October 2024</div>
      <p>
        If you find something missing or have any questions, email us at
        <a
          href="mailto:support@nertivia.com?subject=Question%20About%20Your%20Policy"
          >support@nertivia.com</a
        >.
      </p>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="formData.username" required />
        </div>

        <div class="form-group">
          <label for="server_invite">Server Invite Link:</label>
          <input type="url" id="server_invite" v-model="formData.serverInvite" required />
        </div>

        <div class="form-group">
          <label for="why">Why do you want to verify?:</label>
          <textarea id="why" v-model="formData.why" required></textarea>
        </div>

        <div class="form-group">
          <label for="users">How many users are in your server? (min. 20):</label>
          <input type="number" id="users" v-model.number="formData.userCount" min="20" required />
        </div>

        <button type="submit">Apply</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Header from "@/components/home-page/Header.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ApplyServerVerify",
  components: { Header },
  data() {
    return {
      formData: {
        username: '',
        serverInvite: '',
        why: '',
        userCount: null
      }
    };
  },
  methods: {
    async submitForm() {
      const webhookUrl = 'https://discord.com/api/webhooks/1292980138102751232/KbEDN5YU9rZtDKaeHLmqCHWHbM71sF1h1k6inviGAI3RuO2siZUSPLCrbNL70Rv80f1z';
      const payload = {
        content: `New Application:\n**Username:** ${this.formData.username}\n**Server Invite Link:** ${this.formData.serverInvite}\n**Reason for Verification:** ${this.formData.why}\n**User Count:** ${this.formData.userCount}`
      };

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        alert('Your application has been submitted!');
        this.resetForm();
      } catch (error) {
        console.error('Error sending data to Discord:', error);
        alert('There was an error submitting your application. Please try again.');
      }
    },
    resetForm() {
      this.formData.username = '';
      this.formData.serverInvite = '';
      this.formData.why = '';
      this.formData.userCount = null;
    }
  }
});
</script>

<style scoped lang="scss">
.apply-server-verify {
  color: white;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  align-content: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.updated-date {
  font-size: 12px;
  opacity: 0.8;
}

.content {
  max-width: 700px;
  margin: 30px 10px;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #2a2a2a;
  color: white;
}

textarea {
  resize: vertical; /* allows users to resize the textarea vertically */
}

button {
  padding: 10px 15px;
  background-color: #3cacf4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
