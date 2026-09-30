/*Script para usar no console para remover itens do Boletim em massa, 
ele irá remover todos os itens da prévia que tiver a palavra o frase configurad */

(() => {
  /* 0️⃣  Silencia qualquer window.confirm()/alert() que o sistema abra */
  window.__oldConfirm = window.confirm;
  window.__oldAlert   = window.alert;
  window.confirm = (msg = '') => {
    console.log('🔔 Confirmação auto‑aceita:', msg);
    return true;                    // responde “OK” automaticamente
  };
  window.alert = (msg = '') => {
    console.log('🔔 Alerta ignorado:', msg);
  };

  /* 1️⃣  Frase que identifica os itens a apagar */
  const FRASE_CHAVE = '*SBF*';

  /* 2️⃣  Coleta das tabelas que contêm a frase */
  const botoesApagar = [...document.querySelectorAll('table.frm-borda')]
    .filter(tb => {
      const td = tb.querySelector('td[width="90%"]');
      return td && td.textContent.includes(FRASE_CHAVE);
    })
    .map(tb => tb.querySelector('input.frm-botao2[value*="Apagar"]'))
    .filter(Boolean);

  /* 3️⃣  Disparo sequencial dos botões com leve atraso */
  botoesApagar.forEach((btn, i) => {
    setTimeout(() => {
      btn.click();                              // executa execAcao('pubDelete', …)
      console.log(`✅ Apagado ${i + 1}/${botoesApagar.length}`, btn);
    }, i * 600);                                // 600 ms entre cliques
  });

  console.log(`▶️ Iniciado: ${botoesApagar.length} itens contendo "${FRASE_CHAVE}" serão excluídos.`);
})();
