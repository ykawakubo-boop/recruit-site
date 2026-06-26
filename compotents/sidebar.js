class SidebarComponent extends HTMLElement {
  connectedCallback() {
    // 呼び出し元のHTMLの階層に合わせてパスを調整（デフォルトは現在のディレクトリ）
    const basePath = this.getAttribute('base-path') || '.';
    
    this.innerHTML = `
      <!-- モバイル用ヘッダー -->
      <header id="mobile-header" class="lg:hidden fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md z-40 border-b border-slate-200 px-5 py-3 flex justify-between items-center shadow-sm">
        <a href="${basePath}/index.html" class="flex flex-col items-center text-center">
          <img src="${basePath}/images/透過.png" alt="Diamond head DESIGN" class="h-10 w-auto object-contain mb-0.5" onerror="this.src='https://placehold.co/160x40/e2e8f0/475569?text=LOGO'">
          <span class="block text-[8px] font-bold text-slate-700 tracking-[0.1em] leading-tight">
            DESIGN CAREERS
          </span>
        </a>
        <button id="menu-toggle" class="text-blue-600 font-bold text-sm tracking-widest focus:outline-none">
          MENU
        </button>
      </header>

      <!-- レフトナビゲーション本体 -->
      <aside id="left-nav" class="w-72 h-screen fixed top-0 left-0 bg-white border-r border-slate-200 z-50 flex flex-col py-10 px-8 transform -translate-x-full lg:translate-x-0 transition-transform duration-300 overflow-y-auto">
        
        <!-- ロゴエリア -->
        <a href="${basePath}/index.html" class="block text-center mb-12">
          <img src="${basePath}/images/透過.png" alt="Diamond head DESIGN" class="w-full max-w-[200px] h-auto mx-auto object-contain mb-4" onerror="this.src='https://placehold.co/200x50/e2e8f0/475569?text=LOGO'">
          <span class="block text-xs font-bold text-slate-700 tracking-[0.15em] leading-tight text-center">
            DESIGN CAREERS
          </span>
        </a>

        <!-- メニューリンク -->
        <nav class="flex-grow">
          <ul class="space-y-6">
            <li>
              <a href="${basePath}/index.html" class="flex items-center justify-between text-sm font-bold text-slate-800 hover:text-blue-600 transition group">
                HOME 
                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition"></i>
              </a>
            </li>
            <li class="group">
              <a href="#" class="flex items-center justify-between text-sm font-bold text-slate-800 hover:text-blue-600 transition">
                インタビュー 
                <!-- アイコンを右向き(chevron-right)にし、ホバー時に90度回転(rotate-90)させて下向きにする -->
                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:rotate-90 transition-transform duration-300"></i>
              </a>
              <ul class="hidden group-hover:block pl-4 mt-3 space-y-3 border-l-2 border-slate-100 ml-2">
                <li>
                  <a href="${basePath}/interview/interview_2019.html" class="block text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                    2019年新卒入社
                  </a>
                </li>
                <li>
                  <a href="${basePath}/interview/interview_2018.html" class="block text-sm font-medium text-slate-600 hover:text-blue-600 transition">
                    2018年新卒入社
                  </a>
                </li>
              </ul>
            </li>
            
            <!-- 順番入れ替え：業務委託契約を先に -->
            <li>
              <a href="${basePath}/outsourcing.html" class="flex items-center justify-between text-sm font-bold text-slate-800 hover:text-blue-600 transition group">
                業務委託契約 
                <i data-lucide="chevron-right" class="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition"></i>
              </a>
            </li>
            
            <!-- 順番入れ替え：制作事例を後に -->
            <li>
              <a href="https://design.diamondhead.jp/works/" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between text-sm font-bold text-slate-800 hover:text-blue-600 transition group">
                制作事例 
                <i data-lucide="external-link" class="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition"></i>
              </a>
            </li>
            
          </ul>
        </nav>
      </aside>
    `;

    // 動的に生成したHTML内のLucideアイコンをレンダリング
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({ root: this });
    }

    // モバイル用メニューの開閉制御
    const menuToggle = this.querySelector('#menu-toggle');
    const leftNav = this.querySelector('#left-nav');
    
    if (menuToggle && leftNav) {
      menuToggle.addEventListener('click', () => {
        leftNav.classList.toggle('-translate-x-full');
        
        if (leftNav.classList.contains('-translate-x-full')) {
          menuToggle.textContent = 'MENU';
          menuToggle.classList.remove('text-slate-800');
          menuToggle.classList.add('text-blue-600');
        } else {
          menuToggle.textContent = 'CLOSE';
          menuToggle.classList.remove('text-blue-600');
          menuToggle.classList.add('text-slate-800');
        }
      });

      // モバイル時、メニュー内のリンクをクリックしたらメニューを閉じる
      const navLinks = leftNav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          if (link.getAttribute('href') === '#') {
            e.preventDefault();
            const subMenu = link.nextElementSibling;
            if (subMenu && subMenu.tagName === 'UL') {
              subMenu.style.display = subMenu.style.display === 'block' ? '' : 'block';
            }
            return;
          }
          if (window.innerWidth < 1024) { // lg(1024px)未満の場合のみ
            leftNav.classList.add('-translate-x-full');
            menuToggle.textContent = 'MENU';
            menuToggle.classList.remove('text-slate-800');
            menuToggle.classList.add('text-blue-600');
          }
        });
      });
    }
  }
}

// カスタム要素として登録
customElements.define('sidebar-component', SidebarComponent);
