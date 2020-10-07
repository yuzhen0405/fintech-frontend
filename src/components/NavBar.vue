<template>
  <header>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand href="/">
        <img alt="Fat cat logo" src="../assets/logo.svg">
        FinTech
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/intro">技術指標介紹</b-nav-item>
          <b-nav-item href="/recommendation">智慧推薦</b-nav-item>
          <b-nav-item href="/custom">自訂技術指標</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: 'navbar'
}
</script>