// ==================================================
// CONSTANTS & CONFIGURATION
// ==================================================
const VALID_USERNAME = 'Vicheka';
const VALID_PASSWORD = '123';
const TOTAL_STORAGE_BYTES = 10 * 1024 * 1024 * 1024; // 10 GB

// Initial Default Files
const DEFAULT_FILES = [
  {
    id: 'f1',
    name: 'Project_Proposal_2026.pdf',
    type: 'document',
    sizeBytes: 14.2 * 1024 * 1024,
    date: '2026-09-28'
  },
  {
    id: 'f2',
    name: 'Product_Launch_Video.mp4',
    type: 'media',
    sizeBytes: 840 * 1024 * 1024,
    date: '2026-10-01'
  },
  {
    id: 'f3',
    name: 'Brand_Assets_Master.zip',
    type: 'archive',
    sizeBytes: 1.30 * 1024 * 1024 * 1024,
    date: '2026-10-02'
  },
  {
    id: 'f4',
    name: 'Financial_Summary.docx',
    type: 'document',
    sizeBytes: 3.5 * 1024 * 1024,
    date: '2026-10-02'
  }
];

// SVGs for Icons
const ICONS = {
  success: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  `,
  error: `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  `,
  eyeOpen: `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  `,
  eyeClosed: `
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  `
};

// ==================================================
// DOM REFERENCES
// ==================================================
// Views
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const friendSharedView = document.getElementById('friendSharedView');

// Login Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const eyeIcon = document.getElementById('eyeIcon');
const loginCard = document.getElementById('loginCard');
const brandBadge = document.getElementById('brandBadge');
const alertContainer = document.getElementById('alertContainer');
const alertTitle = document.getElementById('alertTitle');
const alertDesc = document.getElementById('alertDesc');
const alertIcon = document.getElementById('alertIcon');
const alertCloseBtn = document.getElementById('alertCloseBtn');
const loginSubmitBtn = document.getElementById('loginSubmitBtn');
const btnSpinner = document.getElementById('btnSpinner');

// Dashboard Elements
const storageUsedText = document.getElementById('storageUsedText');
const storageBarFill = document.getElementById('storageBarFill');
const legendDocs = document.getElementById('legendDocs');
const legendMedia = document.getElementById('legendMedia');
const legendArchives = document.getElementById('legendArchives');
const legendFree = document.getElementById('legendFree');
const totalFilesCount = document.getElementById('totalFilesCount');
const filesGridContainer = document.getElementById('filesGridContainer');
const emptyState = document.getElementById('emptyState');
const fileUploadInput = document.getElementById('fileUploadInput');
const uploadFileTriggerBtn = document.getElementById('uploadFileTriggerBtn');
const searchFilesInput = document.getElementById('searchFilesInput');
const categoryFilters = document.getElementById('categoryFilters');
const shareDriveBtn = document.getElementById('shareDriveBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Friend View Elements
const friendFilesGridContainer = document.getElementById('friendFilesGridContainer');
const friendGoToLoginBtn = document.getElementById('friendGoToLoginBtn');

// Share Modal Elements
const shareModalBackdrop = document.getElementById('shareModalBackdrop');
const shareLinkInput = document.getElementById('shareLinkInput');
const copyShareLinkBtn = document.getElementById('copyShareLinkBtn');
const copyBtnText = document.getElementById('copyBtnText');
const closeShareModalBtn = document.getElementById('closeShareModalBtn');
const previewFriendViewBtn = document.getElementById('previewFriendViewBtn');

// Toast Notification
const toastNotification = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');
const toastIcon = document.getElementById('toastIcon');

// ==================================================
// STATE MANAGEMENT
// ==================================================
let cloudFiles = loadFilesFromStorage();
let activeFilter = 'all';
let searchQuery = '';

function loadFilesFromStorage() {
  try {
    const saved = localStorage.getItem('vicheka_cloud_files');
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Failed to parse localStorage files:', err);
  }
  return DEFAULT_FILES;
}

function saveFilesToStorage() {
  try {
    localStorage.setItem('vicheka_cloud_files', JSON.stringify(cloudFiles));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// ==================================================
// FORMATTING HELPERS
// ==================================================
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showToast(message, isSuccess = true) {
  toastMessage.textContent = message;
  toastIcon.innerHTML = isSuccess
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  
  toastNotification.classList.remove('hidden');
  setTimeout(() => {
    toastNotification.classList.add('hidden');
  }, 3200);
}

// ==================================================
// ROUTING & VIEW SWITCHING
// ==================================================
function checkRoute() {
  const urlParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash;

  if (urlParams.get('share') === 'vicheka-cloud' || hash === '#shared') {
    showFriendView();
  } else if (sessionStorage.getItem('vicheka_authenticated') === 'true') {
    showDashboardView();
  } else {
    showLoginView();
  }
}

function showLoginView() {
  loginView.classList.remove('hidden');
  dashboardView.classList.add('hidden');
  friendSharedView.classList.add('hidden');
}

function showDashboardView() {
  loginView.classList.add('hidden');
  dashboardView.classList.remove('hidden');
  friendSharedView.classList.add('hidden');
  renderDashboard();
}

function showFriendView() {
  loginView.classList.add('hidden');
  dashboardView.classList.add('hidden');
  friendSharedView.classList.remove('hidden');
  renderFriendFiles();
}

// ==================================================
// AUTHENTICATION LOGIC
// ==================================================
function showAlert(type, title, message) {
  alertContainer.className = `alert-box alert-${type}`;
  alertIcon.innerHTML = ICONS[type];
  alertTitle.textContent = title;
  alertDesc.textContent = message;
  alertContainer.classList.remove('hidden');
}

function hideAlert() {
  alertContainer.classList.add('hidden');
}

alertCloseBtn.addEventListener('click', hideAlert);

togglePasswordBtn.addEventListener('click', () => {
  const isPassword = passwordInput.getAttribute('type') === 'password';
  passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
  eyeIcon.innerHTML = isPassword ? ICONS.eyeClosed : ICONS.eyeOpen;
  togglePasswordBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  hideAlert();

  const enteredUsername = usernameInput.value.trim();
  const enteredPassword = passwordInput.value;

  const isUsernameMatch = enteredUsername.toLowerCase() === VALID_USERNAME.toLowerCase();
  const isPasswordMatch = enteredPassword === VALID_PASSWORD;

  loginSubmitBtn.disabled = true;
  btnSpinner.classList.remove('hidden');

  setTimeout(() => {
    loginSubmitBtn.disabled = false;
    btnSpinner.classList.add('hidden');

    if (isUsernameMatch && isPasswordMatch) {
      sessionStorage.setItem('vicheka_authenticated', 'true');
      loginCard.classList.remove('shake');
      loginCard.classList.add('card-success');
      brandBadge.classList.add('success-badge');

      showAlert('success', 'Login Successful', `Welcome back, ${VALID_USERNAME}! Loading your 10GB Cloud Drive...`);

      // Trigger native alert dialog as requested
      setTimeout(() => {
        alert('Login Successful');
        showDashboardView();
      }, 300);

    } else {
      loginCard.classList.remove('shake');
      void loginCard.offsetWidth; // trigger reflow
      loginCard.classList.add('shake');
      loginCard.classList.remove('card-success');
      brandBadge.classList.remove('success-badge');

      showAlert('error', 'Login Failed', 'Incorrect username or password. Please try again.');
    }
  }, 400);
});

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('vicheka_authenticated');
  showLoginView();
  showToast('You have been logged out.');
});

friendGoToLoginBtn.addEventListener('click', () => {
  window.history.pushState({}, '', window.location.pathname);
  showLoginView();
});

// ==================================================
// DASHBOARD & 10GB STORAGE ENGINE
// ==================================================
function calculateStorage() {
  let totalBytes = 0;
  let docsBytes = 0;
  let mediaBytes = 0;
  let archivesBytes = 0;

  cloudFiles.forEach(file => {
    totalBytes += file.sizeBytes;
    if (file.type === 'document') docsBytes += file.sizeBytes;
    else if (file.type === 'media') mediaBytes += file.sizeBytes;
    else archivesBytes += file.sizeBytes;
  });

  const freeBytes = Math.max(0, TOTAL_STORAGE_BYTES - totalBytes);
  const usedPercentage = Math.min(100, (totalBytes / TOTAL_STORAGE_BYTES) * 100);

  // Update UI Elements
  storageUsedText.textContent = (totalBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  storageBarFill.style.width = `${usedPercentage.toFixed(1)}%`;

  legendDocs.textContent = formatBytes(docsBytes);
  legendMedia.textContent = formatBytes(mediaBytes);
  legendArchives.textContent = formatBytes(archivesBytes);
  legendFree.textContent = (freeBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  totalFilesCount.textContent = cloudFiles.length;

  return { totalBytes, freeBytes };
}

function getFileIconSVG(type, extension) {
  if (type === 'document' || extension === 'pdf' || extension === 'doc' || extension === 'docx') {
    return `<div class="file-type-icon file-icon-pdf">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    </div>`;
  } else if (type === 'media' || ['mp4', 'mov', 'png', 'jpg', 'webp'].includes(extension)) {
    return `<div class="file-type-icon file-icon-video">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="5 3 19 12 5 21 5 3"/>
      </svg>
    </div>`;
  } else {
    return `<div class="file-type-icon file-icon-zip">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="21 8 21 21 3 21 3 8"/>
        <line x1="1" y1="3" x2="23" y2="3"/>
        <path d="M10 12h4"/>
      </svg>
    </div>`;
  }
}

function renderDashboard() {
  calculateStorage();

  const filtered = cloudFiles.filter(file => {
    const matchesCategory = (activeFilter === 'all') || (file.type === activeFilter);
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  filesGridContainer.innerHTML = '';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    filtered.forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      const card = document.createElement('div');
      card.className = 'file-card';
      card.innerHTML = `
        <div class="file-card-top">
          ${getFileIconSVG(file.type, ext)}
          <div class="file-meta-col">
            <div class="file-name-text" title="${file.name}">${file.name}</div>
            <div class="file-size-date">${formatBytes(file.sizeBytes)} • ${file.date}</div>
          </div>
        </div>
        <div class="file-card-actions">
          <button type="button" class="file-action-btn btn-share-single" data-id="${file.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
              <polyline points="16 6 12 2 8 6"/>
              <line x1="12" y1="2" x2="12" y2="15"/>
            </svg>
            <span>Share Link</span>
          </button>
          <button type="button" class="file-action-btn btn-download-single" data-id="${file.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Download</span>
          </button>
          <button type="button" class="file-action-btn btn-delete-single" data-id="${file.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            <span>Delete</span>
          </button>
        </div>
      `;
      filesGridContainer.appendChild(card);
    });
  }
}

function renderFriendFiles() {
  friendFilesGridContainer.innerHTML = '';
  cloudFiles.forEach(file => {
    const ext = file.name.split('.').pop().toLowerCase();
    const card = document.createElement('div');
    card.className = 'file-card';
    card.innerHTML = `
      <div class="file-card-top">
        ${getFileIconSVG(file.type, ext)}
        <div class="file-meta-col">
          <div class="file-name-text" title="${file.name}">${file.name}</div>
          <div class="file-size-date">${formatBytes(file.sizeBytes)} • Shared by Vicheka</div>
        </div>
      </div>
      <div class="file-card-actions">
        <button type="button" class="file-action-btn btn-download-single" data-id="${file.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Download File</span>
        </button>
      </div>
    `;
    friendFilesGridContainer.appendChild(card);
  });
}

// ==================================================
// FILE UPLOAD HANDLING
// ==================================================
uploadFileTriggerBtn.addEventListener('click', () => {
  fileUploadInput.click();
});

fileUploadInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  if (!files.length) return;

  const currentUsage = calculateStorage().totalBytes;
  let addedBytes = 0;

  files.forEach(file => {
    addedBytes += file.size;
  });

  if (currentUsage + addedBytes > TOTAL_STORAGE_BYTES) {
    showToast('Storage Limit Exceeded! Maximum quota is 10 GB.', false);
    fileUploadInput.value = '';
    return;
  }

  files.forEach(file => {
    const ext = file.name.split('.').pop().toLowerCase();
    let type = 'archive';
    if (['pdf', 'doc', 'docx', 'txt', 'xlsx', 'pptx'].includes(ext)) type = 'document';
    else if (['mp4', 'mov', 'png', 'jpg', 'jpeg', 'webp', 'mp3'].includes(ext)) type = 'media';

    cloudFiles.unshift({
      id: 'f_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      name: file.name,
      type: type,
      sizeBytes: file.size,
      date: new Date().toISOString().split('T')[0]
    });
  });

  saveFilesToStorage();
  renderDashboard();
  showToast(`Successfully uploaded ${files.length} file(s) into your 10GB cloud!`);
  fileUploadInput.value = '';
});

// ==================================================
// FILE ACTIONS (DELEGATION)
// ==================================================
document.addEventListener('click', (e) => {
  // 1. Delete File
  const deleteBtn = e.target.closest('.btn-delete-single');
  if (deleteBtn) {
    const fileId = deleteBtn.getAttribute('data-id');
    const file = cloudFiles.find(f => f.id === fileId);
    if (confirm(`Are you sure you want to delete "${file ? file.name : 'this file'}" from your 10GB Cloud storage?`)) {
      cloudFiles = cloudFiles.filter(f => f.id !== fileId);
      saveFilesToStorage();
      renderDashboard();
      showToast('File removed. Storage freed.');
    }
    return;
  }

  // 2. Download File
  const downloadBtn = e.target.closest('.btn-download-single');
  if (downloadBtn) {
    const fileId = downloadBtn.getAttribute('data-id');
    const file = cloudFiles.find(f => f.id === fileId);
    if (file) {
      triggerMockDownload(file.name);
      showToast(`Downloading "${file.name}"...`);
    }
    return;
  }

  // 3. Share Single File
  const shareSingleBtn = e.target.closest('.btn-share-single');
  if (shareSingleBtn) {
    const fileId = shareSingleBtn.getAttribute('data-id');
    const file = cloudFiles.find(f => f.id === fileId);
    openShareModal(file ? file.name : null);
    return;
  }
});

function triggerMockDownload(filename) {
  const dummyContent = `Vicheka Cloud Storage File Content: ${filename}\nSaved in 10GB personal cloud storage.`;
  const blob = new Blob([dummyContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==================================================
// SEARCH & FILTER LISTENERS
// ==================================================
searchFilesInput.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  renderDashboard();
});

categoryFilters.addEventListener('click', (e) => {
  const btn = e.target.closest('.pill-btn');
  if (!btn) return;
  categoryFilters.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  activeFilter = btn.getAttribute('data-filter');
  renderDashboard();
});

// ==================================================
// SHARE MODAL & PUBLIC LINK GENERATION
// ==================================================
function getShareableURL() {
  const url = new URL(window.location.href);
  url.searchParams.set('share', 'vicheka-cloud');
  return url.toString();
}

function openShareModal() {
  shareLinkInput.value = getShareableURL();
  copyBtnText.textContent = 'Copy Link';
  shareModalBackdrop.classList.remove('hidden');
}

function closeShareModal() {
  shareModalBackdrop.classList.add('hidden');
}

shareDriveBtn.addEventListener('click', () => {
  openShareModal();
});

closeShareModalBtn.addEventListener('click', closeShareModal);

shareModalBackdrop.addEventListener('click', (e) => {
  if (e.target === shareModalBackdrop) closeShareModal();
});

copyShareLinkBtn.addEventListener('click', () => {
  const shareUrl = shareLinkInput.value;
  navigator.clipboard.writeText(shareUrl).then(() => {
    copyBtnText.textContent = 'Copied!';
    showToast('Shareable link copied to clipboard!');
    setTimeout(() => {
      copyBtnText.textContent = 'Copy Link';
    }, 2500);
  }).catch(() => {
    shareLinkInput.select();
    document.execCommand('copy');
    copyBtnText.textContent = 'Copied!';
    showToast('Shareable link copied to clipboard!');
  });
});

previewFriendViewBtn.addEventListener('click', () => {
  closeShareModal();
  window.history.pushState({}, '', getShareableURL());
  showFriendView();
});

// ==================================================
// INITIALIZE
// ==================================================
window.addEventListener('DOMContentLoaded', checkRoute);
window.addEventListener('popstate', checkRoute);
