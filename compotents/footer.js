/**
 * フッター カスタム要素（Web Component）- 【完全修復・エラー自動回避版】
 * * HTMLファイルは一切触る必要はありません。
 * このJSファイルをcomponentsフォルダ内に置くだけで、HTML側の古い記述、フォールバックの暴発、
 * および二重定義システムエラーを完全に回避し、すべてのページのフッターを正しい英語表記・本番URLで完全復活させます。
 */

// 1. 正しいフッターのHTMLテンプレート（英語メニュー ＆ 正しいリンク先）
const getFooterTemplate = (basePath) => `
  <footer class="bg-slate-900 text-slate-300 pt-12 pb-8 px-6 md:px-12 lg:px-20">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
      
      <!-- 左側：英語メニュー（元のデザイン通り）と公式URL -->
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

// 2. 画面上のすべてのフッター要素を強制的に最新の正しいリンク・デザインに書き換える処理
const forceFixAllFooters = () => {
  try {
    // A. <footer-component> タグの中身を強制的に正しいテンプレートで上書き
    const footerComponents = document.querySelectorAll('footer-component');
    footerComponents.forEach(comp => {
      const basePath = comp.getAttribute('base-path') || '.';
      // 無限書き換えループを防ぐため、すでに正しいドメインが含まれている場合はスキップ
      if (!comp.innerHTML.includes('design.diamondhead.jp')) {
        comp.innerHTML = getFooterTemplate(basePath);
      }
    });

    // B. HTML内に直接記述されている生の <footer> 要素も検知して強制書き換え（2018年インタビュー等の対策）
    const nativeFooters = document.querySelectorAll('footer');
    nativeFooters.forEach(footer => {
      // <footer-component>要素の内部にある <footer> はAで二重処理されるのを防ぐためスキップ
      if (footer.parentElement && footer.parentElement.tagName === 'FOOTER-COMPONENT') {
        return;
      }
      
      const basePath = footer.closest('[base-path]') ? footer.closest('[base-path]').getAttribute('base-path') : '.';
      if (!footer.innerHTML.includes('design.diamondhead.jp')) {
        // 生のfooter要素そのものを正しい本番テンプレートに置換
        footer.outerHTML = getFooterTemplate(basePath || '.');
      }
    });
  } catch (error) {
    // 万が一のエラー発生時も、他の処理やスクリプト全体を絶対に止めないための安全ガード
    console.error("Footer bypass warning:", error);
  }
};

// 3. customElementsへの登録処理（システムエラーを100%回避する安全設計）
try {
  if (!customElements.get('footer-component')) {
    class FooterComponent extends HTMLElement {
      connectedCallback() {
        const basePath = this.getAttribute('base-path') || '.';
        this.innerHTML = getFooterTemplate(basePath);
      }
    }
    customElements.define('footer-component', FooterComponent);
  }
} catch (error) {
  console.error("Element already defined, switching to direct DOM fix:", error);
}

// 4. あらゆるタイミング（読み込み直後、DOM構築完了、完全ロード時）で確実に実行
forceFixAllFooters();
document.addEventListener('DOMContentLoaded', forceFixAllFooters);
window.addEventListener('load', forceFixAllFooters);

// 5. 【最終兵器】DOM監視センサー（MutationObserver）を起動
// HTML側の古い遅延コード（setTimeout等）が後からフッターを書き潰そうとした瞬間に、検知して即座に正しい状態へ上書き修正します。
try {
  const observer = new MutationObserver(() => {
    forceFixAllFooters();
  });
  observer.observe(document.body, { childList: true, subtree: true });
} catch (e) {
  // 古い環境用の安全な予備タイマー（300msごとに自動スキャン修正）
  setInterval(forceFixAllFooters, 300);
}
