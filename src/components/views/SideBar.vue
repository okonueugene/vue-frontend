<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    id="accordionSidebar"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="/dashboard"
    >
      <div class="sidebar-brand-icon rotate-n-15">
        <i class="fas fa-book"></i>
      </div>
      <div class="sidebar-brand-text mx-3">Library</div>
    </a>

    <!-- Divider -->
    <hr class="sidebar-divider my-0" />

    <!-- Nav Item - Dashboard -->
    <li class="nav-item active">
      <a class="nav-link" href="/dashboard">
        <i class="fas fa-fw fa-tachometer-alt"></i>
        <span>Dashboard</span></a
      >
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

    <!-- Nav Item - Pages Collapse Menu -->
    <li class="nav-item">
      <a class="nav-link collapsed" href="/">
        <i class="fas fa-fw fa-book"></i>
        <span>Books</span>
      </a>
    </li>
    <hr class="sidebar-divider" />

    <li class="nav-item">
      <a class="nav-link collapsed" href="/status">
        <i class="fas fa-fw fa-wrench"></i>
        <span>Categories</span>
      </a>
    </li>
    <hr class="sidebar-divider" />
    <li class="nav-item">
      <a class="nav-link collapsed" href="/status">
        <i class="fas fa-fw fa-wrench"></i>
        <span>Sub-Categories</span>
      </a>
    </li>
    <hr class="sidebar-divider" />
    <li class="nav-item">
      <a class="nav-link collapsed" href="/status">
        <i class="fas fa-fw fa-wrench"></i>
        <span>Loan Book</span>
      </a>
    </li>
    <hr class="sidebar-divider" />
    <li class="nav-item">
      <a class="nav-link collapsed" href="/status">
        <i class="fas fa-fw fa-wrench"></i>
        <span>Administration</span>
      </a>
    </li>
    <hr class="sidebar-divider" />
  </ul>
  <!-- End of Sidebar -->
</template>
