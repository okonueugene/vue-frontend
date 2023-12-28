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
      <a class="nav-link collapsed" href="/categories">
        <i class="fas fa-fw fa-wrench"></i>
        <span>Categories</span>
      </a>
    </li>
    <hr class="sidebar-divider" />
    <li class="nav-item">
      <a class="nav-link collapsed" href="/subcategories">
        <i class="fas fa-fw fa-wrench"></i>
        <span>Sub-Categories</span>
      </a>
    </li>
    <hr class="sidebar-divider" />

    <li class="nav-item">
      <a class="nav-link collapsed" href="/books">
        <i class="fas fa-fw fa-book"></i>
        <span>Books</span>
      </a>
    </li>
    <hr class="sidebar-divider" />
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="bookLoansDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fas fa-fw fa-list"></i>

        <span>Book Loans</span>
      </a>

      <ul
        class="dropdown-menu bg-gradient-primary"
        aria-labelledby="bookLoansDropdown"
      >
        <li>
          <a class="dropdown-item text-white" href="/userdetails">Approved</a>
        </li>
        <li>
          <a class="dropdown-item text-white" href="/roles">Rejected</a>
        </li>
        <li>
          <a class="dropdown-item text-white" href="/permissions">Pending</a>
        </li>

        <li>
          <a class="dropdown-item text-white" href="/permissions">Returned</a>
        </li>

        <li>
          <a class="dropdown-item text-white" href="/permissions">Overdue</a>
        </li>
      </ul>
    </li>
    <hr class="sidebar-divider" />
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="administrationDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i class="fas fa-fw fa-wrench"></i>

        <span>Administration</span>
      </a>

      <ul
        class="dropdown-menu bg-gradient-primary"
        aria-labelledby="administrationDropdown"
      >
        <li>
          <a class="dropdown-item text-white" href="/userdetails">Users</a>
        </li>
        <li>
          <a class="dropdown-item text-white" href="/roles">Roles</a>
        </li>
        <li>
          <a class="dropdown-item text-white" href="/permissions"
            >Permissions</a
          >
        </li>
      </ul>
    </li>
  </ul>

  <!-- End of Sidebar -->
</template>

<script>
//set active class on sidebar
export default {
  mounted() {
    const currentLocation = window.location.pathname;
    const menuItems = document.querySelectorAll(".nav-item a");
    const administrationDropdownItems = document.querySelectorAll(
      "#administrationDropdown ~ .dropdown-menu .dropdown-item"
    );

    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].getAttribute("href") === currentLocation) {
        menuItems[i].classList.add("active");
      }
    }

    for (let i = 0; i < administrationDropdownItems.length; i++) {
      if (
        administrationDropdownItems[i].getAttribute("href") === currentLocation
      ) {
        administrationDropdownItems[i].classList.add("active");
        administrationDropdownItems[i]
          .closest(".nav-item")
          .classList.add("active"); // Add active to parent dropdown toggle
      }
    }

    for (let i = 0; i < bookLoansDropdownItems.length; i++) {
      if (bookLoansDropdownItems[i].getAttribute("href") === currentLocation) {
        bookLoansDropdownItems[i].classList.add("active");
        bookLoansDropdownItems[i].closest(".nav-item").classList.add("active"); // Add active to parent dropdown toggle
      }
    }
  }
};
</script>
