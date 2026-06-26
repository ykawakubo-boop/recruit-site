/**
 * フッター 共通コンポーネント（決定版）
 * * すべてのHTMLファイルから重複したフォールバック（予備コード）を完全に削除し、
 * この外部JSに処理を一本化することで、100%完璧にフッターが表示され、リンクも正しく遷移します。
 */
class FooterComponent extends HTMLElement {
  connectedCallback() {
    const basePath = this.getAttribute('base-path') || '.';
    this.innerHTML = `
      <footer class="bg-slate-900 text-slate-300 pt-12 pb-8 px-6 md:px-12 lg:px-20">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          
          <!-- 左側：英語メニュー（CORPORATE SITE / CSR / CONTACT）と正しい公式URL -->
          <div class="flex flex-wrap justify-center md:justify-start gap-6 font-medium text-sm">
            <a href="https://design.diamondhead.jp/" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">CORPORATE SITE</a>
            <a href="https://csr.diamondhead.jp/?_gl=1*i8jglq*_gcl_au*MTYyNDY5OTA2Ni4xNzgwOTk0ODM2" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">CSR</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSe3ourzAaRgRIV6fMVq2dziMm5qKey4Iell5d3bjStALeWT5A/viewform" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">CONTACT</a>
          </div>
          
          <!-- 右側：コピーライト -->
          <div class="text-sm text-slate-500">
            © Diamond head Co., Ltd.
          </div>
        </div>

        <!-- 下部右側：SCSKロゴ -->
        <div class="max-w-7xl mx-auto flex justify-end border-t border-slate-800 pt-6">
          <a href="https://www.scsk.jp/" target="_blank" class="block bg-white/90 p-2 rounded-md hover:opacity-80 transition-opacity">
            <img src="${basePath}/images/scsk_black.png" alt="SCSK" class="w-[90px] h-auto object-contain" onerror="this.src='https://placehold.co/90x30/fff/000?text=SCSK'">
          </a>
        </div>
      </footer>
    `;
  }
}

// 二重定義によるクラッシュを防ぐ安全ガード
if (!customElements.get('footer-component')) {
  customElements.define('footer-component', FooterComponent);
}
