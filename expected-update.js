(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const cards = new Map($$('.card').map(card => [card.querySelector('h3')?.textContent.trim(), card]));

  const fallback = (title, author) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="640"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#8f1e58"/><stop offset=".62" stop-color="#e86d9f"/><stop offset="1" stop-color="#ffd4e5"/></linearGradient></defs><rect width="420" height="640" fill="url(#g)"/><text x="210" y="80" text-anchor="middle" font-family="Arial" font-size="15" fill="white" letter-spacing="2">ОБЛОЖКА УТОЧНЯЕТСЯ</text><text x="210" y="280" text-anchor="middle" font-family="Georgia" font-weight="bold" font-size="34" fill="white">${esc(title)}</text><text x="210" y="545" text-anchor="middle" font-family="Arial" font-size="18" fill="white">${esc(author)}</text></svg>`
  );

  function newCard(book) {
    const img = book.cover || fallback(book.title, book.author);
    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `<div class="cover-wrap"><img class="cover" src="${img}" alt="Обложка книги ${esc(book.title)}"></div><div class="card-body"><span class="badge">${book.count} ${book.count === 1 ? 'сигнал' : book.count < 5 ? 'сигнала' : 'сигналов'}</span><h3>${esc(book.title)}</h3><p class="author">${esc(book.author)}</p><p class="meta">${esc(book.meta)}</p><p class="release"><strong>Ожидается:</strong> ${esc(book.release)}</p><p class="desc">${esc(book.desc)}</p>${book.why ? `<p class="why"><strong>Почему ждут:</strong> ${esc(book.why)}</p>` : ''}<details class="evidence"><summary>Российские сигналы и проверка даты</summary><ul>${book.sources.map(([name,url]) => `<li><a href="${url}" target="_blank" rel="noopener">${esc(name)}</a></li>`).join('')}</ul><p class="date-note">Дата и статус проверены отдельно по издателю, ISBN, FantLab или предзаказу; техническое подтверждение не увеличивает счётчик.</p></details></div>`;
    cards.set(book.title, article);
    return article;
  }

  newCard({title:'Мама, я в Москве',author:'Дина Губайдуллина',count:1,meta:'Автофикшн · Москва 2020-х',release:'ноябрь 2026',cover:'expected-assets/mama-moscow.jpg',desc:'Почти пятьсот страниц самоироничных историй о профессии актрисы, переезде в столицу, татарской идентичности, семье и тревожной повседневности.',why:'Рамблер включил книгу в список самых ожидаемых релизов осени.',sources:[['Рамблер/книги','https://weekend.rambler.ru/knigi/57065905-10-samyh-ozhidaemyh-knig-oseni-2026-goda-avtofikshn-o-zhire-i-horror-o-tverskoy-usadbe/']]});
  newCard({title:'Возвращение барона Венкхейма',author:'Ласло Краснахоркаи',count:8,meta:'Большой европейский роман · перевод с венгерского',release:'2026 · в издательском плане',desc:'Пожилой аристократ возвращается в родной венгерский город и оказывается внутри сплетен, политической борьбы и надвигающейся катастрофы.',why:'Это самый широкий российский консенсус списка: роман одновременно вошёл в годовые выборы восьми независимых редакций.',sources:[['Афиша Daily','https://daily.afisha.ru/culture/30643-50-knig-kotorye-my-budem-chitat-v-2026-godu/'],['Полка','https://www.polka.academy/materials/1103'],['The Blueprint','https://theblueprint.ru/culture/paper/books-2026'],['Sobaka.ru','https://www.sobaka.ru/entertainment/books/209905'],['Кинопоиск','https://www.kinopoisk.ru/media/article/4012215/'],['Т—Ж','https://t-j.ru/list/anticipated-books-2026/'],['ЛитРес: Журнал','https://www.litres.ru/journal/samye-ozhidaemye-khudozhestvennye-knigi-2026-goda/'],['Ключ-Медиа','https://kluch.tv/blog/novye-knigi-2026/']]});
  newCard({title:'Солнечный корт',author:'Нора Сакавич',count:2,meta:'Спортивная драма · продолжение «Всё ради игры»',release:'24 ноября 2026 · электронный релиз',cover:'expected-assets/solar-court.jpg',desc:'История Жана Моро и команды «Троянцев» уже собрала на LiveLib около 1,3 тыс. оценок и более 1,2 тыс. отметок «хочу прочитать».',why:'Российский фандом обсуждает роман задолго до официального перевода; отдельным сигналом стала история локального предзаказа.',sources:[['LiveLib','https://www.livelib.ru/book/1013187112-solnechnyj-kort-nora-sakavich'],['CineVista','https://cinevista.ru/news/soda-press-zakryla-predzakaz-na-knigu-2026-06-24']]});
  newCard({title:'Рассказать историю',author:'Джон Бёрджер, Сьюзен Сонтаг',count:2,meta:'Критика · письма · разговор о сторителлинге',release:'ноябрь 2026 · предзаказ',cover:'expected-assets/tell-story-tetris.jpg',desc:'Теледебаты, выступления и письма двух интеллектуалов складываются в спор о природе рассказа, фотографии и общественной роли изображения.',why:'Книгу выделили сезонный список ожиданий и независительный материал «Года Литературы» о новинках Ad Marginem.',sources:[['Sobaka.ru','https://www.sobaka.ru/entertainment/books/209905'],['Год Литературы','https://godliteratury.ru/articles/2026/09/18/novinki-izdatelstva-ad-marginem-i-moskovskaia-knizhnaia-iarmarka-vzgliad-iznutri']]});
  newCard({title:'Мир после падения',author:'singNsong',count:1,meta:'Корейская веб-новелла · постапокалипсис',release:'ноябрь 2026 · издательский план',desc:'Герой отказывается повернуть время вспять и выбирает бороться за мир, обречённый на гибель. Российское издание заявлено в шести томах.',why:'Пока найден один независимый русскоязычный материал профильного медиа.',sources:[['Плюс минус 16','https://16pm.ru/mir-posle-padeniya-novella-ot-singnsong-oficzialno-vyjdet-v-rossii/']]});

  const counts = {
    'Берегина':4,'Площадь оружия':4,'Юрга':3,'В самый последний раз':2,'Пародист. Пьесы для чтения':1,'Мама, я в Москве':1,
    'Возвращение барона Венкхейма':8,'Невспаханное поле':5,'Просто мечты':3,'Горемычный Фурса':3,'Связанные звёздами':3,'Сердце водопада':3,
    'Снежный день и другие истории':2,'Марцан мон амур':2,'Король Кориума':2,'Солнечный корт':2,'Рассказать историю':2,
    'Клуб Плюща':1,'Как убить своего главного фаната':1,'Публичное сожжение':1,'Мир после падения':1
  };
  const foreign = {
    'Просто мечты':['womensprize.com','dublinliteraryaward.ie'],
    'Снежный день и другие истории':['kirkusreviews.com','asianreviewofbooks.com','theatlantic.com'],
    'Марцан мон амур':['dublinliteraryaward.ie'],
    'Клуб Плюща':['kirkusreviews.com','goodreads.com'],
    'Король Кориума':['goodreads.com']
  };
  cards.delete('Антикварная лавка Гримм');
  cards.forEach((card,title) => {
    if (!(title in counts)) return;
    const n = counts[title];
    const badge = $('.badge', card);
    badge.className = 'badge' + (n >= 4 ? '' : n >= 2 ? ' early' : ' watch');
    badge.textContent = `${n} ${n === 1 ? 'сигнал' : n < 5 ? 'сигнала' : 'сигналов'}`;
    (foreign[title] || []).forEach(domain => $$(`a[href*="${domain}"]`, card).forEach(a => a.closest('li')?.remove()));
    if (foreign[title]) {
      const note = $('.date-note', card);
      if (note) note.textContent = 'В счётчике оставлены только русскоязычные российские сигналы. Зарубежная критика и премии не повышают уровень книги.';
    }
  });

  const russian = ['Берегина','Площадь оружия','Юрга','В самый последний раз','Пародист. Пьесы для чтения','Мама, я в Москве'];
  const translations = ['Возвращение барона Венкхейма','Невспаханное поле','Просто мечты','Горемычный Фурса','Связанные звёздами','Сердце водопада','Снежный день и другие истории','Марцан мон амур','Король Кориума','Солнечный корт','Рассказать историю','Клуб Плюща','Как убить своего главного фаната','Публичное сожжение','Мир после падения'];
  function rebuild(sectionId, titles) {
    const wrap = $(`#${sectionId} .wrap`);
    $$('.tier-title, .cards', wrap).forEach(el => el.remove());
    [['Основной список · 4+',n=>n>=4],['Ранние сигналы · 2–3',n=>n>=2&&n<4],['Наблюдение · 1 сигнал',n=>n===1]].forEach(([label,test]) => {
      const selected = titles.filter(t => test(counts[t]));
      if (!selected.length) return;
      const h = document.createElement('h3'); h.className='tier-title'; h.textContent=label;
      const grid = document.createElement('div'); grid.className='cards';
      selected.sort((a,b)=>counts[b]-counts[a]).forEach(t=>grid.append(cards.get(t)));
      wrap.append(h,grid);
    });
  }
  rebuild('russian', russian); rebuild('translations', translations);

  $('.hero .intro').textContent = 'Российские оригиналы и переводы, которые ещё не вышли и уже получили независимое внимание в России. В счётчик входят только русскоязычные медиа, локальные читательские платформы, книжные каналы и публичные счётчики ожидания.';
  $('.hero .stats').innerHTML = '<span class="stat">21 книга</span><span class="stat">6 российских оригиналов</span><span class="stat">15 переводов</span><span class="stat">4 позиции · 4+ сигналов</span><span class="stat">11 позиций · 2–3 сигнала</span><span class="stat">6 позиций · 1 сигнал</span>';
  $$('.route em').forEach((el,i)=>el.textContent=(i===0?'6 книг →':'15 книг →'));
  $('#translations .group-note').textContent = 'Для переводов учитывается только российское ожидание русской версии. Зарубежные рецензии, премии, Goodreads и StoryGraph могут быть контекстом, но не добавляют сигнал.';

  $('.trend').innerHTML = `<p class="eyebrow">Сводка ожиданий</p><h2>Что именно уже привлекает внимание</h2><div class="trend-grid"><article class="trend-card"><h3>Большая проза возвращается через перевод</h3><p>«Возвращение барона Венкхейма» собирает самый широкий российский консенсус: медиа ждут роман о возвращении домой, которого больше нет. «Невспаханное поле» добавляет к этому частную память о переломе европейской истории.</p></article><article class="trend-card"><h3>Локальный интерес важнее зарубежной славы</h3><p>«Просто мечты» и «Снежный день» остаются заметными, но после удаления иностранных премий и рецензий переходят в ранние сигналы. Так уровень показывает ожидание именно русского издания.</p></article><article class="trend-card"><h3>Фандомы создают собственный маршрут</h3><p>У «Солнечного корта» внимание видно в тысячах оценок, рецензиях и отметках «хочу прочитать» на LiveLib. «Мир после падения» начинает путь с профильного русскоязычного медиа, знакомого с корейскими новеллами и вебтунами.</p></article><article class="trend-card"><h3>Личный опыт становится наблюдением</h3><p>«Мама, я в Москве» превращает опыт актрисы и приезжей в автофикшн о столице 2020-х, татарской идентичности и творческой бедности. «Берегина» работает с детской уязвимостью через фольклорный ужас.</p></article><article class="trend-card"><h3>Разговор об историях сам становится книгой</h3><p>В «Рассказать историю» спор Бёрджера и Сонтаг о нарративе соединён с письмами и публичными выступлениями. Российские источники ждут книгу как живой разговор о том, что изображения и рассказы делают с реальностью.</p></article><article class="trend-card"><h3>Предзаказ не равен вниманию</h3><p>Карточка издателя подтверждает дату, ISBN и статус, но не добавляет балл. Поэтому книги без независимого российского упоминания не входят в список, даже если предзаказ уже открыт.</p></article></div>`;
  const method = $('.method');
  method.innerHTML = `<h2>Как собран список</h2><ol><li>Собран широкий пул из русскоязычных книжных медиа, сезонных подборок, читательских платформ и публичных книжных каналов.</li><li>Для каждой позиции проверено, что русское издание ещё не поступило в обычную продажу к 3 ноября 2026 года.</li><li>Одна организация считается одним сигналом, даже если упомянула книгу несколько раз.</li><li>Издатель, ISBN, FantLab и магазин подтверждают дату; без самостоятельной редакционной оценки или заметного счётчика ожидания они не добавляют сигнал.</li><li>Зарубежные рецензии, премии, Goodreads и StoryGraph не входят в счётчик.</li><li>Уровни: <strong>4+ — основной список</strong>; <strong>2–3 — ранние сигналы</strong>; <strong>1 — наблюдение</strong>.</li></ol><p class="caveat"><strong>Важно:</strong> список живой. После выхода книга удаляется; новое независимое российское упоминание может повысить её уровень.</p>`;
  document.querySelector('footer').textContent = '«Ожидаемые книги» · отдельный спецвыпуск «Книжного радара» · проверено 03.11.2026';

  const modal = document.getElementById('cover-modal'), large = modal?.querySelector('img');
  $$('.cover').forEach(img => { img.tabIndex=0; const open=()=>{large.src=img.src;large.alt=img.alt;modal.classList.add('open')}; img.onclick=open; img.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}}; });
})();
