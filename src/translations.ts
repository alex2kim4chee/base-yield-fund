import { ProtocolInfo, FAQItem, RiskProfileData } from './types';

export interface TranslationSchema {
  nav: {
    title: string;
    subtitle: string;
    verify: string;
    getAccess: string;
    compoundPool: string;
    netAvgApy: string;
  };
  hero: {
    tagline: string;
    title1: string;
    title2: string;
    subline: string;
    ctaAccess: string;
    ctaCalculate: string;
    trustCustody: string;
    trustApproval: string;
    trustCoinbase: string;
  };
  problem: {
    tagline: string;
    title: string;
    subline1: string;
    subline2: string;
    walletTitle: string;
    walletDesc: string;
    trackingTitle: string;
    trackingDesc: string;
    riskTitle: string;
    riskDesc: string;
    mathTitle: string;
    mathDesc: string;
    quote: string;
    badge: string;
    compareTitle: string;
    compareDesc: string;
    compareTrad: string;
    compareFund: string;
    deltaTitle: string;
    deltaText: string;
  };
  whatWeDo: {
    tagline: string;
    title: string;
    subline: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    step5Title: string;
    step5Desc: string;
    step6Title: string;
    step6Desc: string;
    custodyProof: string;
  };
  tech: {
    tagline: string;
    title: string;
    subline: string;
    cornerBadge: string;
    activeSpecs: string;
    bottomNote: string;
    labels: {
      tvlDeployed: string;
      avgGas: string;
      primaryBenefits: string;
      authStandard: string;
      riskCuration: string;
      auditedCode: string;
      lendingRates: string;
      systemHealth: string;
      volumeShare: string;
      lpYields: string;
      backingPool: string;
      yieldDrivers: string;
      routingModel: string;
      currentDepth: string;
      integrationTvl: string;
      riskGrade: string;
      coreAi: string;
      decisionMechanism: string;
    };
    items: Record<string, { title: string; desc: string }>;
  };
  strategy: {
    tagline: string;
    title: string;
    subline: string;
    table: {
      protocol: string;
      underliers: string;
      expectedApy: string;
      sizingTvl: string;
      riskTier: string;
      liveNote: string;
    };
    principlesTitle: string;
    principlesSubtitle: string;
    metricsTitle: string;
    metricsSubtitle: string;
    metricsDesc: string;
    returns: {
      conservative: string;
      conservativeSub: string;
      balanced: string;
      balancedSub: string;
      growth: string;
      growthSub: string;
      perMonth: string;
      perYear: string;
    };
  };
  whoThisIsFor: {
    tagline: string;
    title: string;
    subline: string;
    convictions: {
      c1Title: string;
      c1Desc: string;
      c2Title: string;
      c2Desc: string;
      c3Title: string;
      c3Desc: string;
      c4Title: string;
      c4Desc: string;
    };
    table: {
      title: string;
      tradTitle: string;
      fundTitle: string;
      custody: string;
      custodyTrad: string;
      custodyFund: string;
      freezes: string;
      freezesTrad: string;
      freezesFund: string;
      seizure: string;
      seizureTrad: string;
      seizureFund: string;
      inflation: string;
      inflationTrad: string;
      inflationFund: string;
      return: string;
      returnTrad: string;
      returnFund: string;
      identity: string;
      identityTrad: string;
      identityFund: string;
      usdcNote: string;
    };
    compliance: {
      tagline: string;
      title: string;
      subline: string;
      badge: string;
    };
    safeguards: {
      tagline: string;
      title: string;
      riskBoundsTitle: string;
      riskBoundsDesc: string;
      gasBufferTitle: string;
      gasBufferDesc: string;
      noAutoTitle: string;
      noAutoDesc: string;
      bottomNote: string;
    };
  };
  transparency: {
    tagline: string;
    title: string;
    subline: string;
    c1Title: string;
    c1Desc: string;
    c2Title: string;
    c2Desc: string;
    badge: string;
    links: {
      morpho: string;
      moonwell: string;
      basescan: string;
    };
  };
  decisions: {
    tagline: string;
    title: string;
    sweepsTitle: string;
    sweepsDesc: string;
    weightsTitle: string;
    weightsDesc: string;
    boundsTitle: string;
    boundsDesc: string;
    card: {
      title: string;
      candidate: string;
      gain: string;
      gas: string;
      status: string;
      passed: string;
      hint: string;
    };
  };
  ownership: {
    tagline: string;
    title: string;
    subline: string;
    control: string;
    controlItems: string[];
    manage: string;
    manageItems: string[];
    card: {
      title: string;
      minStart: string;
      recBal: string;
      exitLimits: string;
      exitValue: string;
      btn: string;
    };
  };
  faq: {
    tagline: string;
    title: string;
    subline: string;
  };
  liveHealth: {
    tagline: string;
    title: string;
    subline: string;
    metrics: {
      tvl: string;
      tvlSub: string;
      accounts: string;
      accountsSub: string;
      apy: string;
      apySub: string;
      txs: string;
      txsSub: string;
    };
    feed: {
      title: string;
      subline: string;
      badge: string;
      headers: {
        account: string;
        action: string;
        volume: string;
        route: string;
        status: string;
        age: string;
      };
      actions: {
        deposit: string;
        rebalance: string;
        compound: string;
        withdraw: string;
      };
      status: {
        confirmed: string;
        pending: string;
      };
      times: {
        justNow: string;
        secondsAgo: string;
        minutesAgo: string;
      };
    };
  };
  footer: {
    badge: string;
    title: string;
    subline: string;
    cta: string;
    disclaimer: string;
    copyright: string;
  };
  modal: {
    close: string;
    badge: string;
    title: string;
    subline: string;
    accessTitle: string;
    accessDesc: string;
    accessBtn: string;
    reportTitle: string;
    reportDesc: string;
    reportBtn: string;
    legalNote: string;
  };
  calculator: {
    badge: string;
    title: string;
    desc: string;
    depositLabel: string;
    riskLabel: string;
    riskTiers: {
      conservative: string;
      balanced: string;
      growth: string;
      target: string;
    };
    disclosure: {
      title: string;
      downsideText: string;
      extraText: string;
      safetyStatus: string;
      levelMinimal: string;
      levelModerate: string;
      levelElevated: string;
      textConservative: string;
      textBalanced: string;
      textGrowth: string;
    };
    simTitle: string;
    apyTitle: string;
    apyCompiled: string;
    monthlyTitle: string;
    weightTitle: string;
    disclaimer: string;
  };
  simulator: {
    walletBadge: string;
    connected: string;
    statusInactive: string;
    descInactive: string;
    btnScan: string;
    statusActive: string;
    reading: string;
    rebalanceBadge: string;
    ago: string;
    fluidTitle: string;
    deltaText: string;
    rebalanceAction: string;
    gasEstimate: string;
    slippage: string;
    btnApprove: string;
    btnReject: string;
    statusPasskey: string;
    descPasskey: string;
    pendingBiometric: string;
    broadcasting: string;
    descBroadcasting: string;
    completeTitle: string;
    completeDesc: string;
    resolvedBadge: string;
    btnReset: string;
    power: string;
    strategyBadge: string;
    strategyTitle: string;
    outputTab: string;
    flowTab: string;
    logs: {
      init: string;
      risk: string;
      morphoScan: string;
      moonwellScan: string;
      fluidScan: string;
      rule: string;
      alert: string;
      auth: string;
      wait: string;
      calldata: string;
      submit: string;
      confirm: string;
      resolved: string;
      idle: string;
      hint: string;
    };
    card: {
      title: string;
      routed: string;
      margin: string;
      safety: string;
      solvency: string;
      solvencyValue: string;
      exit: string;
      exitValue: string;
      complianceTitle: string;
      complianceStatus: string;
      checklist: string[];
    };
    bottomNote: string;
  };
  protocols: ProtocolInfo[];
  riskProfiles: Record<string, RiskProfileData>;
  faqs: FAQItem[];
  notDoPrinciples: { title: string; desc: string }[];
  preTradeChecks: string[];
}

export const translations: Record<'ru' | 'en', TranslationSchema> = {
  ru: {
    nav: {
      title: 'Base Yield Fund',
      subtitle: 'Управление на базе ИИ с self-custody',
      verify: 'Проверить позиции',
      getAccess: 'Лист ожидания →',
      compoundPool: 'Пул авто-компаунда:',
      netAvgApy: 'Средняя APY нетто:',
    },
    hero: {
      tagline: 'Инфраструктура Smart Account от Coinbase',
      title1: 'Ваши деньги. Ваш кошелек.',
      title2: 'DeFi-доходность институционального уровня под вашим контролем.',
      subline: 'Мы реализуем доходные стратегии на базе ИИ в сети Base — той же инфраструктуре, которую используют ведущие мировые DeFi-протоколы — чтобы вы получали от 4% до 40% APY на свои доллары без лишней сложности.',
      ctaAccess: 'Получить доступ',
      ctaCalculate: 'Рассчитать доходность APY',
      trustCustody: '100% self-custody',
      trustApproval: 'Одобрение каждой транзакции',
      trustCoinbase: 'Построено на технологиях Coinbase',
    },
    problem: {
      tagline: 'РАЗДЕЛ 01 — ПРОБЛЕМА',
      title: 'DeFi приносит больше. Но обычным пользователям туда сложно попасть.',
      subline1: 'Стейблкоины на стандартных сберегательных счетах приносят около 0.5%. Тот же доллар, размещенный на блокчейне Base, приносит от 4% до 40% APY — подтвержденно, ончейн, каждый день.',
      subline2: 'Проблема не в знаниях. Дело в инфраструктуре. Управление серьезной DeFi-стратегией требует:',
      walletTitle: 'Программируемый кошелек',
      walletDesc: 'Нужна поддержка смарт-контрактов стандарта ERC-4337 для пакетного выполнения транзакций без газа.',
      trackingTitle: 'Мониторинг 24/7',
      trackingDesc: 'Ежечасное отслеживание ставок в пулах, чтобы ловить пики и избегать падения доходности.',
      riskTitle: 'Оценка рисков',
      riskDesc: 'Регулярная оценка лимитов платежеспособности протоколов, уровня "плохих долгов" и залога.',
      mathTitle: 'Создание транзакций',
      mathDesc: 'Написание сложных смарт-контрактов для вызовов функций с целью экономии на сетевых комиссиях.',
      quote: '«Мы автоматизировали всё это. Вам остается только подтверждать операции».',
      badge: 'СРАВНЕНИЕ APY',
      compareTitle: 'Разница процентных ставок',
      compareDesc: 'Сравнение обычного долларового счета и позиций в Base.',
      compareTrad: 'Обычный банковский счет',
      compareFund: 'Средняя ставка Base Yield Fund',
      deltaTitle: 'Итоговая разница',
      deltaText: 'Каждые $1000 на обычном депозите приносят около $5 в год. Размещенный в Base, тот же доллар приносит до $250 ожидаемого дохода.',
    },
    whatWeDo: {
      tagline: 'РАЗДЕЛ 02 — ЧЕМ МЫ ЗАНИМАЕМСЯ',
      title: 'Умная yield-стратегия. Управляется ИИ. Контролируется вами.',
      subline: 'Мы помогаем управлять вашим Base-аккаунтом — удобной оболочкой для смарт-кошелька от Coinbase. При этом вы никогда не передаете свои криптографические приватные ключи третьим лицам.',
      step1Title: 'Создание аккаунта',
      step1Desc: 'Занимает всего 2 минуты. Работает полностью на базе биометрических passkey-ключей от Coinbase.',
      step2Title: 'Депозит стейблкоинов',
      step2Desc: 'Пополнение баланса в USDC — ведущем регулируемом стейблкоине США, обеспеченном 1:1 к доллару.',
      step3Title: 'Постоянный анализ',
      step3Desc: 'Наш ИИ-агент ежечасно сканирует ставки и показатели риска в 6+ протоколах (Morpho, Moonwell, Fluid, Aerodrome, Avantis).',
      step4Title: 'Подготовка транзакций',
      step4Desc: 'Мы упаковываем маршруты вызовов в готовую транзакцию и детально расписываем риски и доходность в цифрах.',
      step5Title: 'Подтверждение',
      step5Desc: 'Вы получаете пуш-уведомление на свое устройство и подписываете транзакцию в один тап через Apple FaceID или TouchID.',
      step6Title: 'Получение дохода',
      step6Desc: 'Накопленные проценты оседают сразу на вашем кошельке и автоматически реинвестируются для сложного процента.',
      custodyProof: 'Доказательство self-custody: вы лично подписываете каждую транзакцию на блокчейне. Base Yield Fund не имеет доступа к вашему балансу.',
    },
    tech: {
      tagline: 'РАЗДЕЛ 03 — ТЕХНОЛОГИЧЕСКИЙ СТЕК',
      title: 'Построено на базе инфраструктуры ведущих DeFi-фондов.',
      subline: 'Мы работаем напрямую с проверенными, открытыми и прошедшими аудит протоколами. Выберите любой элемент стека, чтобы изучить его параметры.',
      cornerBadge: 'ИД_СТЕКА: ',
      activeSpecs: 'АКТИВНЫЕ ХАРАКТЕРИСТИКИ',
      bottomNote: 'Вся логика открыта и верифицирована на GitHub. Вы можете проверить хэши компилятора в любой момент самостоятельно.',
      labels: {
        tvlDeployed: 'Развернутый TVL',
        avgGas: 'Средняя цена газа',
        primaryBenefits: 'Основные преимущества',
        authStandard: 'Стандарт авторизации',
        riskCuration: 'Управление рисками',
        auditedCode: 'Проверка аудитом',
        lendingRates: 'Ставки по кредитам',
        systemHealth: 'Ликвидность системы',
        volumeShare: 'Доля рынка в сети',
        lpYields: 'Доходность LP пулов',
        backingPool: 'Объем залогового пула',
        yieldDrivers: 'Источники дохода',
        routingModel: 'Model маршрутизации',
        currentDepth: 'Текущий объем TVL',
        integrationTvl: 'TVL интеграции',
        riskGrade: 'Класс надежности',
        coreAi: 'Ядро ИИ-интеграции',
        decisionMechanism: 'Механизм принятия решений',
      },
      items: {
        base: { title: 'Блокчейн Base', desc: 'Надежная Ethereum L2 сеть, поддерживаемая Coinbase. Транзакции стоят менее $0.01 с мгновенным расчетом.' },
        erc4337: { title: 'Смарт-аккаунты ERC-4337', desc: 'Смарт-аккаунты на аппаратных ключах (passkey) с поддержкой пакетных транзакций, кастомного восстановления и оплаты газа токенами.' },
        morpho: { title: 'Протокол Morpho', desc: 'Децентрализованное кредитование под управлением Gauntlet и Steakhouse. Более $4 млрд TVL.' },
        moonwell: { title: 'Протокол Moonwell', desc: 'Кредитные пулы с прямым доступом в сети Base, динамически реагирующие на рыночный спрос заемщиков.' },
        aerodrome: { title: 'Aerodrome Finance', desc: 'Пулы концентрированной ликвидности стейблкоинов, генерирующие доход от торговых комиссий DEX в Base.' },
        fluid: { title: 'Протокол Fluid', desc: 'Умный маршрутизатор ликвидности, оптимизирующий эффективность капитала между кредитными рынками.' },
        avantis: { title: 'Avantis', desc: 'Институциональные пулы ликвидности, выступающие контрагентом для торговли фьючерсами с плечом в Base.' },
        aave: { title: 'Aave v3 / Spark', desc: 'Крупнейшие проверенные временем протоколы кредитования, служащие консервативными якорями надежности.' },
        claude: { title: 'Claude AI + Base MCP', desc: 'Автономный сканер ставок, анализирующий рыночную доходность относительно установленных лимитов безопасности.' },
      },
    },
    strategy: {
      tagline: 'РАЗДЕЛ 04 — ВСЕЛЕННАЯ СТРАТЕГИЙ',
      title: 'Один кошелек. Шесть протоколов. Оптимальная доходность в сети Base.',
      subline: 'Мы не ограничиваемся одним контрактом. Капитал динамически распределяется между консервативными депозитами и активными пулами ликвидности для извлечения максимальной прибыли.',
      table: {
        protocol: 'DeFi Протокол',
        underliers: 'Стратегия / Активы',
        expectedApy: 'Ожидаемая APY',
        sizingTvl: 'TVL пула',
        riskTier: 'Категория риска',
        liveNote: '*Ставки APY подтягиваются в реальном времени. Прошлые результаты не гарантируют будущую доходность.',
      },
      principlesTitle: 'Меры безопасности',
      principlesSubtitle: 'Чего мы никогда не делаем',
      metricsTitle: 'Матрицы доходности',
      metricsSubtitle: 'Прогноз доходности портфеля',
      metricsDesc: 'Сколько приносит пул авто-компаунда в размере $1000 USDC при разных настройках риска?',
      returns: {
        conservative: 'Консервативный портфель',
        conservativeSub: 'Депозиты с кураторством от Gauntlet',
        balanced: 'Сбалансированная модель',
        balancedSub: 'Сплит Morpho и Moonwell',
        growth: 'Оптимизация роста',
        growthSub: 'Смешанные LP-пары и Avantis',
        perMonth: 'в месяц',
        perYear: 'в год',
      },
    },
    whoThisIsFor: {
      tagline: 'РАЗДЕЛ 05 — СВОБОДНЫЕ СБЕРЕЖЕНИЯ',
      title: 'Создано для людей, которые решили владеть своими деньгами лично, а не через банк.',
      subline: 'Вам не обязательно скептически относиться к традиционным банкам, чтобы быть здесь. Но если вы хотите полный контроль — вы в правильном месте. Наше правило: самые безопасные сбережения — это те, к которым ни один посредник не имеет доступа.',
      convictions: {
        c1Title: 'Нестабильность локальных систем',
        c1Desc: 'Видели заморозки счетов, девальвацию валют за одну ночь или ограничения на снятие? Мы даем альтернативный путь.',
        c2Title: 'Финансовый суверенитет',
        c2Desc: 'Ваши доллары должны работать на вас, а не лежать на счетах банков, которые могут ограничить доступ к ним по своему усмотрению.',
        c3Title: 'Глобальный DeFi доход',
        c3Desc: 'Реальная доходность, генерируемая рыночным спросом на ликвидность, а не решениями регуляторов.',
        c4Title: 'Никакой сложности',
        c4Desc: 'Вам не нужно становиться экспертом в смарт-контрактах. Мы управляем кодом, а ключи от кошелька остаются у вас.',
      },
      table: {
        title: 'Сравнение: Традиционные финансы vs Наш сервис',
        tradTitle: 'ТРАДИЦИОННЫЕ ФИНАНСЫ',
        fundTitle: 'СЕРВИС BASE YIELD FUND',
        custody: 'Хранение депозита:',
        custodyTrad: 'Банк распоряжается вашими деньгами',
        custodyFund: 'Вы единолично владеете ключами',
        freezes: 'Блокировка счета:',
        freezesTrad: 'Банк может заморозить счет в любой момент',
        freezesFund: 'Устойчивость к цензуре (Decentralized)',
        seizure: 'Риск изъятия:',
        seizureTrad: 'Зависит от локальных решений властей',
        seizureFund: 'Защищено блокчейн-криптографией',
        inflation: 'Валютные риски:',
        inflationTrad: 'Риск инфляции национальной валюты',
        inflationFund: 'USDC — привязка 1:1 к доллару США',
        return: 'Процентный доход:',
        returnTrad: '0.5% средняя ставка по депозитам',
        returnFund: 'Диапазоны от 4.0% до 40.0% APY',
        identity: 'Идентификация:',
        identityTrad: 'Паспорт, налоговые документы, визиты в офис',
        identityFund: 'Требуется только подключение к интернету',
        usdcNote: 'Информация о стейблкоине USDC: Средства хранятся в USDC, полностью обеспеченном резервами компании Circle (регулируемая финансовая организация в США). Перемещается без задержек 24 часа в сутки.',
      },
      compliance: {
        tagline: 'АУДИТ ПРОТОКОЛОВ',
        title: 'Комплаенс-проверка перед сделкой',
        subline: 'Перед формированием любой рекомендации по ребалансировке наша система проводит валидацию по всем параметрам безопасности.',
        badge: 'СТАТУС БЕЗОПАСНОСТИ: ',
      },
      safeguards: {
        tagline: 'ЗАЩИТА СИСТЕМЫ',
        title: 'Институциональный подход к безопасности',
        riskBoundsTitle: 'Лимиты риска по уровням',
        riskBoundsDesc: 'Консервативные стратегии активны по умолчанию. Переход в высокодоходные пулы требует вашего явного согласия.',
        gasBufferTitle: 'Буфер для оплаты газа',
        gasBufferDesc: 'Мы держим небольшой запас Ethereum (ETH) на вашем счету для быстрой оплаты комиссий при выводе средств.',
        noAutoTitle: 'Никаких авто-списаний',
        noAutoDesc: 'ИИ проводит анализ и строит маршрут, но только ваше физическое нажатие на экран отправляет транзакцию в сеть.',
        bottomNote: '*Мы никогда не спрашиваем, откуда вы. И не проверяем, зачем вам нужен контроль над вашими деньгами. Это ваше суверенное право.',
      },
    },
    transparency: {
      tagline: 'РАЗДЕЛ 06 — ПРОЗРАЧНОСТЬ',
      title: 'Каждая цифра проверяется. Ончейн. Любым человеком.',
      subline: 'В отличие от классических закрытых офшорных фондов, у нас нет секретов. Любую операцию можно проверить через публичные обозреватели блоков.',
      c1Title: 'Интеграция с BaseScan',
      c1Desc: 'Каждое начисление процентов, перераспределение средств и ребалансировка видны по адресу вашего кошелька на basescan.org.',
      c2Title: 'Прямая сверка с DeFi-протоколами',
      c2Desc: 'Ваш баланс можно подтвердить в любой момент, просто подключив свой адрес к панелям управления на сайтах morpho.org или moonwell.fi.',
      badge: 'ССЫЛКИ НА ПЕРВОИСТОЧНИКИ',
      links: {
        morpho: 'Трекер протокола Morpho',
        moonwell: 'Панель управления Moonwell',
        basescan: 'Обозреватель BaseScan L2',
      },
    },
    decisions: {
      tagline: 'РАЗДЕЛ 07 — ПРИНЯТИЕ РЕШЕНИЙ',
      title: 'Выбор за данными. Подготовка за ИИ. Подтверждение за вами.',
      sweepsTitle: 'Ежедневный сканер',
      sweepsDesc: 'Планировщик запрашивает данные о ставках во всех протоколах, фиксируя падение доходности или рост рисков.',
      weightsTitle: 'Система весов',
      weightsDesc: 'Кандидаты оцениваются по чистой ставке APY, объему TVL, качеству залога и затратам на транзакции.',
      boundsTitle: 'Порог ребалансировки',
      boundsDesc: 'Операции блокируются, если прогнозируемый выигрыш по процентам не окупает сетевой газ быстрее, чем за 3 месяца.',
      card: {
        title: 'ПРИМЕР РАБОТЫ ИИ-АНАЛИЗАТОРА',
        candidate: 'Кандидат на перевод:',
        gain: 'Ожидаемый прирост APY:',
        gas: 'Оценочный газ:',
        status: 'Статус прохождения лимита:',
        passed: 'ПОРОГ ПРОЙДЕН',
        hint: 'Рекомендация готовится автоматически и отправляется вам на подпись.',
      },
    },
    ownership: {
      tagline: 'РАЗДЕЛ 08 — ВЛАДЕНИЕ АККАУНТОМ',
      title: 'Счет принадлежит вам. Мы управляем только стратегией.',
      subline: 'Это не общий пул и не доверительное управление. Вы не отправляете деньги нам. Ваши стейблкоины остаются на вашем личном кошельке Base Account (на базе инфраструктуры Coinbase) и доступны к выводу в любой момент.',
      control: 'ЧТО КОНТРОЛИРУЕТЕ ВЫ',
      controlItems: [
        '100% владение приватными ключами',
        'Мгновенный вывод средств без штрафов',
        'Одобрение или отклонение любых операций',
      ],
      manage: 'ЧТО ОПТИМИЗИРУЕТ СЕРВИС',
      manageItems: [
        'Ежедневный поиск лучших доходностей',
        'Подготовка транзакций с минимизацией рисков',
        'Автоматический учет для налоговой отчетности',
      ],
      card: {
        title: 'Условия обслуживания',
        minStart: 'Минимум для старта:',
        recBal: 'Рекомендуемый баланс:',
        exitLimits: 'Лимиты на выход:',
        exitValue: 'Мгновенно, без ограничений',
        btn: 'Отправить заявку на доступ →',
      },
    },
    faq: {
      tagline: 'РАЗДЕЛ 09 — ВОПРОСЫ И ОТВЕТЫ',
      title: 'Часто задаваемые вопросы',
      subline: 'Мы стремимся к полной прозрачности. Если у вас есть другие вопросы, вы можете задать их в наших ончейн-каналах.',
    },
    liveHealth: {
      tagline: 'РАЗДЕЛ 10 — ТЕКУЩИЕ ПОКАЗАТЕЛИ',
      title: 'Аналитика движения капитала',
      subline: 'Проверяйте общие показатели системы, которые обновляются в режиме реального времени.',
      metrics: {
        tvl: 'АКТИВЫ ПОД НАБЛЮДЕНИЕМ',
        tvlSub: 'Синхронизация с пулами Base',
        accounts: 'АКТИВНЫЕ СМАРТ-СЧЕТА',
        accountsSub: 'Полное владение пользователями',
        apy: 'СРЕДНЯЯ ДОХОДНОСТЬ APY',
        apySub: 'Показатель за последние 30 дней',
        txs: 'ОБРАБОТАННЫЕ ТРАНЗАКЦИИ',
        txsSub: 'Успешное выполнение 100%',
      },
      feed: {
        title: 'Лента транзакций на блокчейне Base',
        subline: 'Последние операции, совершенные пользователями системы в реальном времени.',
        badge: 'СИНХРОНИЗАЦИЯ С СЕТЬЮ Base',
        headers: {
          account: 'Смарт-аккаунт',
          action: 'Операция',
          volume: 'Объем',
          route: 'Направление',
          status: 'Статус в сети',
          age: 'Время',
        },
        actions: {
          deposit: 'Депозит',
          rebalance: 'Ребаланс',
          compound: 'Начисление APY',
          withdraw: 'Вывод',
        },
        status: {
          confirmed: 'Подтверждено',
          pending: 'В процессе',
        },
        times: {
          justNow: 'Только что',
          secondsAgo: ' сек. назад',
          minutesAgo: ' мин. назад',
        },
      },
    },
    footer: {
      badge: 'ПОЛУЧИТЬ ПРИГЛАШЕНИЕ В СЕРВИС',
      title: 'Готовы заставить ваши доллары работать?',
      subline: 'Доступ предоставляется только по приглашениям. Если вы перешли по ссылке от доверенного партнера — вы уже можете войти.',
      cta: 'Запросить ранний доступ →',
      disclaimer: 'Предупреждение: Данный сервис предоставляется исключительно в информационных и операционных целях и не является финансовой рекомендацией. Инвестиции в криптовалюту сопряжены с риском полной потери капитала. Прошлые результаты не гарантируют доход в будущем. Пользователь несет личную ответственность за сохранность своих средств.',
      copyright: '© 2026 Base Yield Fund. Работает на технологиях абстракции кошельков Coinbase и Anthropic Model Context Protocol. Все права защищены.',
    },
    modal: {
      close: '[esc] ЗАКРЫТЬ',
      badge: 'СВЯЗЬ И ДОСТУП',
      title: 'Связаться с Base Yield Fund',
      subline: 'Выберите цель вашего обращения для автоматической подготовки запроса.',
      accessTitle: 'Лист ожидания для доступа',
      accessDesc: 'Подать заявку на ранний доступ. Пожалуйста, укажите в письме планируемый размер депозита (минимальный порог от $1 000).',
      accessBtn: 'Подготовить заявку в hello@baseyieldfund.com',
      reportTitle: 'Запрос отчета по позициям',
      reportDesc: 'Запросить актуальный детальный отчет по текущим DeFi-позициям, начисленной доходности и ребалансировкам.',
      reportBtn: 'Запросить отчет в report@baseyieldfund.com',
      legalNote: '*Шаблон письма будет открыт в вашем почтовом клиенте. Мы никогда не запрашиваем сид-фразы, приватные ключи или пароли.',
    },
    calculator: {
      badge: 'РАСЧЕТ ДОХОДНОСТИ',
      title: 'Симулятор конфигураций',
      desc: 'Настройте сумму депозита и уровень риска для симуляции доходности в реальном времени.',
      depositLabel: 'Сумма депозита',
      riskLabel: 'Профиль риска',
      riskTiers: {
        conservative: 'консервативный',
        balanced: 'сбалансированный',
        growth: 'агрессивный',
        target: 'СТАВКА APY',
      },
      disclosure: {
        title: 'Оценка сценария просадки капитала',
        downsideText: 'Ожидаемый худший сценарий при ',
        extraText: ': потеря до ',
        safetyStatus: 'Статус безопасности: ',
        levelMinimal: 'Минимальный системный риск',
        levelModerate: 'Умеренное изменение параметров',
        levelElevated: 'Повышенная волатильность LP',
        textConservative: 'Консервативные пулы используют проверенных кураторов. Главный риск — баги в коде контрактов Aave/Morpho, а не ликвидации.',
        textBalanced: 'Вероятен риск невозврата долга по второстепенным залогам Moonwell. Отличный баланс риска и доходности.',
        textGrowth: 'Активная работа с пулами ликвидности DEX Aerodrome и плечом трейдеров Avantis. Высокий доход при строгих лимитах потерь.',
      },
      simTitle: 'СИМУЛЯЦИЯ ОЖИДАЕМОГО ДОХОДА',
      apyTitle: 'ПРОГНОЗ APY',
      apyCompiled: 'сложный %',
      monthlyTitle: 'ПРИБЫЛЬ В МЕСЯЦ',
      weightTitle: 'Веса распределения активов',
      disclaimer: '*Все распределения осуществляются на вашем личном кошельке под вашим полным контролем. Каждое действие требует подписи вашим passkey.',
    },
    simulator: {
      walletBadge: 'BASE SMART ACCOUNT',
      connected: 'Подключен',
      statusInactive: 'Система ИИ не запущена',
      descInactive: 'Запустите сканер в терминале протоколов справа для инициализации поиска выгодных пулов.',
      btnScan: 'Запустить ИИ-сканирование',
      statusActive: 'ИИ-стратегия ищет пулы...',
      reading: 'Анализ текущих блоков сети...',
      rebalanceBadge: 'РЕКОМЕНДУЕТСЯ РЕБАЛАНСИРОВКА',
      ago: 'только что',
      fluidTitle: 'Доходность в пулах Fluid',
      deltaText: 'доходность выросла',
      rebalanceAction: 'Перевести 30% капитала из Morpho Prime в пулы Fluid с избыточным обеспечением.',
      gasEstimate: 'Комиссия сети: < $0.01 USDC',
      slippage: 'Допустимое проскальзывание: 0.01%',
      btnApprove: 'Подтвердить операцию FaceID/TouchID',
      btnReject: 'Отклонить рекомендацию',
      statusPasskey: 'Ожидание биометрии...',
      descPasskey: 'Пожалуйста, подтвердите операцию через аппаратный ключ (FaceID/TouchID) вашего телефона.',
      pendingBiometric: 'Ожидание подписи транзакции...',
      broadcasting: 'Трансляция транзакции в сеть...',
      descBroadcasting: 'Упаковка пакета вызовов в транзакцию ERC-4337 и отправка бандлеру Base.',
      completeTitle: 'Ребаланс успешно завершен',
      completeDesc: 'Ваши USDC успешно перенаправлены. Проценты начисляются в реальном времени.',
      resolvedBadge: 'ТРАНЗАКЦИОННЫЙ ПАКЕТ ПРИНЯТ',
      btnReset: 'Перезапустить симулятор',
      power: 'На базе технологий Coinbase Base SDK',
      strategyBadge: 'ИИ-СТРАТЕГИЯ MCP + CLAUDE',
      strategyTitle: 'Конвейер анализа рыночных ставок',
      outputTab: 'Логи терминала',
      flowTab: 'Анализ рисков',
      logs: {
        init: 'STG-ENG >> Инициализация контекста Base Blockchain MCP...',
        risk: 'STG-ENG >> Загрузка риск-профиля пользователя: [СБАЛАНСИРОВАННЫЙ]...',
        morphoScan: 'CORE-SCAN >> Запрос live-состояния пулов Morpho... [TVL $412M] APY: 4.5%',
        moonwellScan: 'CORE-SCAN >> Запрос live-состояния Moonwell USDC... [TVL $15.4M] APY: 9.3%',
        fluidScan: 'CORE-SCAN >> Запрос live-состояния Fluid... [TVL $12.8M] APY: 6.8% (Растет ⬆)',
        rule: 'STG-ENG >> Проверка правила ребаланса... Дельта > 1.5% APY за вычетом газа',
        alert: 'STG-ENG >> [СИГНАЛ] Обнаружена доходная возможность в пулах Fluid.',
        auth: 'USER-AUTH >> Запрос криптографической подписи от Coinbase Smart Wallet...',
        wait: 'USER-AUTH >> Ожидание FaceID/TouchID подписи от пользователя...',
        calldata: 'STG-TX >> Calldata транзакции успешно сформирована. Метод: batchDepositFluidUSDC()',
        submit: 'STG-TX >> Отправка операции ERC-4337 бандлеру сети Base...',
        confirm: 'STG-TX >> Получено подтверждение блока. Хэш транзакции: 0xfdb1a4e27b9c99120ffc914b',
        resolved: 'STG-TX >> Yield-аккумуляция запущена. Баланс портфеля обновлен.',
        idle: 'Состояние терминала: режим ожидания.',
        hint: 'Нажмите кнопку «Запустить ИИ-сканирование» на экране мобильного телефона слева...',
      },
      card: {
        title: 'ОЦЕНКА РИСКОВ MCP',
        routed: 'МАРШРУТ АКТИВЕН',
        margin: 'Прирост чистой ставки: +2.3% APY',
        safety: 'Безопасность куратора: A+ (Gauntlet Curation)',
        solvency: 'Обеспечение пула: Избыточное (Overcollateralized)',
        solvencyValue: 'Безопасный лимит залога',
        exit: 'Вывод из пула: < 1 минуты',
        exitValue: 'Высокая ликвидность',
        complianceTitle: 'ПРЕДПОЛЕТНАЯ ПРОВЕРКА COMPLIANCE',
        complianceStatus: '6/6 ПРОЙДЕНО',
        checklist: [
          'Возраст целевого пула превышает 6+ месяцев',
          'Отсутствие кредитных плеч в контракте транзакции',
          'Отклонение курса USDC от доллара < 0.1%',
        ],
      },
      bottomNote: 'Данный симулятор работает в защищенной песочнице и визуализирует процесс взаимодействия между ИИ-моделью анализа доходности и вашим смарт-аккаунтом Coinbase.',
    },
    protocols: [
      {
        id: 'aave',
        name: 'Aave v3 / Spark',
        strategy: 'Кредитование USDC и доходность Blue-chip',
        expectedApy: 3.5,
        tvl: '$30M+ (Aave) / $222M+ (Spark)',
        riskTier: 'Conservative',
        badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
        textColor: 'text-green-400',
        description: 'Проверенные временем протоколы кредитования с глубокой ликвидностью. Самый безопасный выбор с умеренным доходом и максимальной историей аудита в DeFi.'
      },
      {
        id: 'morpho-prime',
        name: 'Morpho (Gauntlet / Steakhouse Prime)',
        strategy: 'Кредитование через кураторские хранилища',
        expectedApy: 4.5,
        tvl: '$370M - $456M',
        riskTier: 'Conservative',
        badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
        textColor: 'text-green-400',
        description: 'Размещает USDC в кураторских хранилищах под управлением ведущих риск-агентств Gauntlet и Steakhouse Finance. Выдача займов институциональным заемщикам под избыточный залог.'
      },
      {
        id: 'morpho-high-yield',
        name: 'Morpho (High Yield Vaults)',
        strategy: 'Кредитование через кураторские хранилища',
        expectedApy: 6.0,
        tvl: '$4M - $25M',
        riskTier: 'Moderate',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        textColor: 'text-blue-400',
        description: 'Хранилища кредитования с повышенной доходностью при контролируемых рисках смарт-контрактов и ручном отборе пулов заемщиков.'
      },
      {
        id: 'fluid',
        name: 'Fluid Protocol',
        strategy: 'Оптимизированный рынок кредитования',
        expectedApy: 6.5,
        tvl: '$12M+',
        riskTier: 'Moderate',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        textColor: 'text-blue-400',
        description: 'Механизм кредитования нового поколения, который динамически распределяет капитал между заемщиками для максимизации загрузки капитала.'
      },
      {
        id: 'moonwell',
        name: 'Moonwell Protocol',
        strategy: 'Прямые займы в USDC',
        expectedApy: 9.5,
        tvl: '$15M+',
        riskTier: 'Moderate',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        textColor: 'text-blue-400',
        description: 'Ведущий кредитный рынок в сети Base. Ставка гибко реагирует на ончейн-спрос на кредиты, показывая высокую доходность в периоды активности рынка.'
      },
      {
        id: 'morpho-specialty',
        name: 'Morpho (OUSD / Niche Vaults)',
        strategy: 'Специализированные кредитные пулы',
        expectedApy: 8.0,
        tvl: '$2M+',
        riskTier: 'Elevated',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        textColor: 'text-amber-400',
        description: 'Нишевые категории активов с повышенной маржинальностью. Управляются ближе к границам ликвидности, но предлагают отличные мультипликаторы доходности.'
      },
      {
        id: 'avantis',
        name: 'Avantis',
        strategy: 'Обеспечение ликвидности перп-биржи',
        expectedApy: 11.5,
        tvl: '$45M+',
        riskTier: 'Elevated',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        textColor: 'text-amber-400',
        description: 'Пул ликвидности выступает контрагентом для трейдеров децентрализованной биржи фьючерсов с плечом. Доход складывается из комиссий и убытков трейдеров.'
      },
      {
        id: 'aerodrome',
        name: 'Aerodrome (Stable LPs)',
        strategy: 'Комиссии от торговли USDC/USDT',
        expectedApy: 30.0,
        tvl: '$1M - $8M',
        riskTier: 'Active',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        textColor: 'text-rose-400',
        description: 'Предоставление концентрированной ликвидности в парах стейблкоинов на крупнейшей бирже в сети Base. Сбор комиссий от торгового объема в реальном времени.'
      }
    ],
    riskProfiles: {
      conservative: {
        name: 'Консервативная стратегия',
        description: 'Ориентирована на максимальное сохранение капитала с использованием эталонных DeFi-хранилищ с высоким уровнем избыточного залога.',
        expectedApyRange: [4.0, 5.0],
        allocations: [
          { percentage: 60, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Консервативный якорь' },
          { percentage: 40, protocolName: 'Aave v3 / Spark', apy: 3.5, role: 'Буфер ликвидности' }
        ],
        riskDiscussions: 'Стратегия имеет высочайшую устойчивость к дефициту ликвидности. Основные риски ограничены исключительно надежностью смарт-контрактов Aave и Morpho.'
      },
      balanced: {
        name: 'Сбалансированная стратегия',
        description: 'Фокусируется на повышенной средней доходности за счет распределения стейблкоинов между надежными якорями и высоколиквидными Moonwell и Fluid.',
        expectedApyRange: [7.0, 9.5],
        allocations: [
          { percentage: 40, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Консервативный якорь' },
          { percentage: 35, protocolName: 'Moonwell Protocol', apy: 9.5, role: 'Двигатель доходности' },
          { percentage: 15, protocolName: 'Fluid Protocol', apy: 6.5, role: 'Маршрутизатор капитала' },
          { percentage: 10, protocolName: 'Aave v3 / Spark', apy: 3.5, role: 'Безопасность капитала' }
        ],
        riskDiscussions: 'Оптимальный баланс высокого дохода и сильной защиты капитала. Риск умеренно зависит от изменения спроса заемщиков и уровня утилизации средств.'
      },
      growth: {
        name: 'Стратегия роста',
        description: 'Использует торговые комиссии бирж, ликвидность перп-контрактов контрагентов и динамические пулы объемов для извлечения максимальных ставок доходности.',
        expectedApyRange: [11.0, 25.0],
        allocations: [
          { percentage: 30, protocolName: 'Aerodrome (Stable LPs)', apy: 30.0, role: 'Начисление активных комиссий' },
          { percentage: 30, protocolName: 'Avantis', apy: 11.5, role: 'Контрагент трейдеров' },
          { percentage: 20, protocolName: 'Moonwell Protocol', apy: 9.5, role: 'Двигатель доходности' },
          { percentage: 20, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Консервативный якорь' }
        ],
        riskDiscussions: 'Высокая ставка доходности, подкрепленная реальными торговыми объемами. Подвержена риску смещения ценового диапазона ликвидности LP.'
      }
    },
    faqs: [
      {
        question: 'Безопасны ли мои деньги?',
        answer: 'Ваши средства находятся на вашем личном смарт-контракт аккаунте Base Account (ERC-4337) под защитой Coinbase. Мы не имеем доступа к вашим средствам. Любая транзакция, изменение долей или вывод средств требуют вашей личной цифровой подписи (FaceID/TouchID).'
      },
      {
        question: 'Что если я захочу забрать свои средства?',
        answer: 'Вы можете вывести средства в любой момент. У нас нет блокировок или штрафов за досрочный вывод. Вывод из Morpho и Moonwell на ваш основной кошелек обычно занимает не более пары минут. В периоды редких пиковых нагрузок на кредитных рынках вывод может занять чуть больше времени, поэтому мы держим буфер ликвидности.'
      },
      {
        question: 'Каковы комиссии сервиса?',
        answer: 'Базовые DeFi-протоколы (такие как Morpho и Moonwell) взимают собственные комиссии за управление (0-15%) с генерируемого дохода, которые уже вычтены из отображаемых ставок APY. Наша платформа удерживает небольшую комиссию только с фактически полученной вами чистой прибыли.'
      },
      {
        question: 'Каковы ключевые риски инвестирования?',
        answer: 'Каждый уровень портфеля несет в себе свой тип риска. Консервативный уровень (Aave, Morpho Prime) практически исключает риски ликвидаций, основной риск — уязвимости в коде смарт-контрактов. Пулы повышенного риска (Avantis, Aerodrome) зависят от объемов торгов и волатильности курсов. Мы показываем оценку просадки в долларах перед каждым действием.'
      },
      {
        question: 'Нужно ли быть экспертом в DeFi для работы?',
        answer: 'Совсем нет. Вам понадобится только кошелек Coinbase или любой совместимый Web3-кошелек. Наша система берет на себя всю сложную работу по анализу ставок, подготовке транзакций и комплаенсу. Вы просто подтверждаете рекомендации в один тап на телефоне.'
      },
      {
        question: 'Как обстоят дела с налогами?',
        answer: 'Платформа предоставляет готовый детализированный отчет о каждой ончейн-операции. Данные обо всех депозитах, выплатах дохода и комиссиях экспортируются в структурированном виде, готовом для передачи налоговому консультанту.'
      }
    ],
    notDoPrinciples: [
      {
        title: 'Никаких кредитных плеч и займов',
        desc: 'Мы никогда не берем кредиты под залог ваших активов и не открываем маржинальные позиции.'
      },
      {
        title: 'Без мем-токенов и сомнительных контрактов',
        desc: 'Мы работаем исключительно со стабильными монетами (stablecoins) в проверенных временем пулах с прозрачной историей.'
      },
      {
        title: 'Никаких слепых входов под запредельные APY',
        desc: 'Протоколы с высокой ставкой доходности проходят жесткие проверки обеспечения залогом перед отправкой капитала.'
      },
      {
        title: 'Без долгих блокировок капитала',
        desc: 'Ваши USDC всегда доступны для вывода, чтобы вы могли мгновенно выйти в кэш при росте волатильности.'
      }
    ],
    preTradeChecks: [
      'Подтвердить, что TVL протокола превышает порог безопасности ($10M+ ядро, $50M+ вся система)',
      'Проверить чистоту аудита и срок работы контракта в сети (стандарт от 12+ месяцев)',
      'Сверить параметры надежности залога по API Gauntlet или Steakhouse Finance',
      'Убедиться, что текущая загрузка пула заемщиков ниже критического лимита',
      'Сопоставить комиссию сети с выгодой (ребаланс должен окупать газ менее чем за 3 месяца)',
      'Построить маршрут мгновенного вывода капитала на случай резких изменений рынка'
    ]
  },
  en: {
    nav: {
      title: 'Base Yield Fund',
      subtitle: 'AI-Assisted Self-Custody',
      verify: 'Verify Positions',
      getAccess: 'Get early access →',
      compoundPool: 'Compound Pool:',
      netAvgApy: 'Net Avg APY:',
    },
    hero: {
      tagline: 'Coinbase Smart Account Infrastructure',
      title1: 'Your money. Your account.',
      title2: 'Institutional-grade DeFi yield — managed for you.',
      subline: "We run an AI-assisted yield strategy on Base blockchain — the same infrastructure used by the world's top DeFi protocols — so you earn 4–40% APY on your dollars without lifting a finger.",
      ctaAccess: 'Get early access',
      ctaCalculate: 'Estimate APY Returns',
      trustCustody: '100% self-custody',
      trustApproval: 'Every transaction approved',
      trustCoinbase: 'Built on Coinbase Stack',
    },
    problem: {
      tagline: 'SECTION 01 — THE PROBLEM',
      title: "DeFi pays more. Most people can't access it.",
      subline1: 'Stablecoins sitting in savings accounts earn 0.5%. The same dollar deployed on Base blockchain earns 4–40% APY — verified, on-chain, every single day.',
      subline2: "The gap isn't knowledge. It's structural infrastructure. Running a serious DeFi strategy requires:",
      walletTitle: 'Programmable Wallet',
      walletDesc: 'Requires ERC-4337 smart-contract capabilities to bundle operations efficiently.',
      trackingTitle: 'Real-time Tracking',
      trackingDesc: 'Hourly monitoring of yields across pools to capture peaks and bypass drop-offs.',
      riskTitle: 'Robust Risk Assessment',
      riskDesc: 'Evaluating lock solvency caps, bad debt ratios, and dynamic collateral levels.',
      mathTitle: 'Tx Construction',
      mathDesc: 'Crafting exact batch smart contracts and routing scripts to save on execution gas.',
      quote: '"We\'ve built all of that. You just approve."',
      badge: 'APY COMPARE',
      compareTitle: 'Compound Rate Spread',
      compareDesc: 'Comparing traditional dollars vs Base positions.',
      compareTrad: 'Traditional Bank Account',
      compareFund: 'Base Yield Fund Blended Rate',
      deltaTitle: 'Target Delta Result',
      deltaText: 'Every $1,000 sitting in standard savings earns roughly $5 annually. Deployed actively on Base, that same dollar compiles up to $250 in expected yield.',
    },
    whatWeDo: {
      tagline: 'SECTION 02 — WHAT WE DO',
      title: 'A yield strategy. Managed by AI. Controlled by you.',
      subline: "We manage your Base Account — Coinbase's smart wallet wrapper — the same way a wealth manager watches a portfolio. The difference: you never give up cryptographic self-custody.",
      step1Title: 'Open a Base Account',
      step1Desc: "Takes just 2 minutes. Powered entirely by Coinbase's smart passkey wallet backend underneath.",
      step2Title: 'Fund account with USDC',
      step2Desc: 'Fund with the leading fully-backed, US-regulated stablecoin pegged 1:1 to the US dollar.',
      step3Title: 'AI daily opportunity sweeps',
      step3Desc: 'Our MCP bot scans across 6+ protocols (Morpho, Moonwell, Fluid, Aerodrome, Avantis) hourly for yield-risk metrics.',
      step4Title: 'We prepare transaction sheets',
      step4Desc: 'We craft the direct gas calldata and map precise risk matrices, explaining realistic dollar downside.',
      step5Title: 'Approve with one tap',
      step5Desc: 'You receive recommendations on your device. Confirm using secure hardware locks or Apple FaceID.',
      step6Title: 'Automatic compounding',
      step6Desc: 'Yield accrues directly in your self-custody wallet, automatically compounding to raise your position value.',
      custodyProof: 'Custody proof: You see and sign every underlying blockchain transaction. Base Yield Fund never holds administrative custody over your keys.',
    },
    tech: {
      tagline: 'SECTION 03 — THE TECHNOLOGY',
      title: "Built on the same stack as the world's top DeFi funds.",
      subline: 'We integrate directly with secure, audited, and open-source blue-chip protocols. Click any stack vector to inspect its architecture.',
      cornerBadge: 'STACK_ID: ',
      activeSpecs: 'ACTIVE DESTRUCTURING SPECS',
      bottomNote: 'All logic is open source and verifiable on GitHub. You can check every compiler hash independently.',
      labels: {
        tvlDeployed: 'TVL deployed',
        avgGas: 'Average gas cost',
        primaryBenefits: 'Primary benefits',
        authStandard: 'Authentication standard',
        riskCuration: 'Risk curation teams',
        auditedCode: 'Audited state code',
        lendingRates: 'Typical lending rates',
        systemHealth: 'Primary system health',
        volumeShare: 'Ecosystem volume share',
        lpYields: 'LP pool yields',
        backingPool: 'Liquidity backing pool',
        yieldDrivers: 'Yield drivers',
        routingModel: 'Vault utilization model',
        currentDepth: 'Current TVL depth',
        integrationTvl: 'Integration TVL',
        riskGrade: 'Risk Profile grade',
        coreAi: 'Core AI integration',
        decisionMechanism: 'Decision mechanism',
      },
      items: {
        base: { title: 'Base Blockchain', desc: 'Secure Ethereum L2 backed and maintained by Coinbase. Transactions cost under $0.01 with total instant settlement.' },
        erc4337: { title: 'ERC-4337 Smart Accounts', desc: 'Hardware-passkey cryptographical accounts capable of batch action execution, custom recovery thresholds, and gas abstraction.' },
        morpho: { title: 'Morpho Protocol', desc: 'Overcollateralized decentralized lending optimized by Gauntlet and Steakhouse risk curation teams. Over $4B TVL.' },
        moonwell: { title: 'Moonwell Protocol', desc: 'Direct-lending liquidity vaults native to Base, dynamically responding to live retail credit demands.' },
        aerodrome: { title: 'Aerodrome Finance', desc: 'Concentrated stablecoin trading pools generating raw trading fee volumes on Base\'s largest liquidity DEX.' },
        fluid: { title: 'Fluid Protocol', desc: 'Dynamic liquidity routing engine optimizing utilization across credit and debt markets.' },
        avantis: { title: 'Avantis', desc: 'Institutional peer-to-pool liquidity vaults supporting perpetual exchange trades on Base.' },
        aave: { title: 'Aave v3 / Spark', desc: 'Established DeFi protocols representing the absolute blue-chip safety anchors on Base ecosystem.' },
        claude: { title: 'Claude AI + Base MCP', desc: 'Autonomous monitoring scanner synthesizing on-chain rates directly against predefined safety risk buffers.' },
      },
    },
    strategy: {
      tagline: 'SECTION 04 — STRATEGY UNIVERSE',
      title: 'One dollar. Six protocols. The best risk-adjusted yield on Base.',
      subline: "We don't limit ourselves to one single contract. We allocate dynamically across conservative anchors and moderator pools to maximize net return within your selected safety tier limits.",
      table: {
        protocol: 'DeFi Protocol',
        underliers: 'Lending Strategy / Underliers',
        expectedApy: 'Expected APY',
        sizingTvl: 'Protocol Sizing TVL',
        riskTier: 'Assessed Risk Tier',
        liveNote: '*APY figures are live variables pulled from smart logs. Past performance stays separate from future outcomes.',
      },
      principlesTitle: 'Safety Safeguards',
      principlesSubtitle: 'What we never do',
      metricsTitle: 'Yield Metrics',
      metricsSubtitle: 'Portfolio Return Matrices',
      metricsDesc: 'How much does an auto-compound pool allocation of $1,000 USDC earn across different system configurations?',
      returns: {
        conservative: 'Conservative Target',
        conservativeSub: 'Gauntlet Curated vaults',
        balanced: 'Balanced Model',
        balancedSub: 'Morpho + Moonwell composite',
        growth: 'Growth Optimization',
        growthSub: 'Blended LP pairs & Avantis',
        perMonth: '/mo',
        perYear: ' annual',
      },
    },
    whoThisIsFor: {
      tagline: 'SECTION 05 — SOVEREIGN SAVINGS',
      title: "Built for people who've decided their money belongs to them — not their bank.",
      subline: "You don't need to distrust the traditional financial system to be here. But if you do — you're in the right place. We share a simple conviction: the safest place for your savings is where no intermediary can reach them.",
      convictions: {
        c1Title: 'Unpredictable Local Systems',
        c1Desc: 'Watched banks freeze accounts, currencies devalue overnight, and capital restrictions appear? We offer an alternative path.',
        c2Title: 'Financial Sovereignty',
        c2Desc: 'Your dollars should compile for you, not sit inside institutions that block, inflate, or compromise them at whim.',
        c3Title: 'Borderless DeFi Yield',
        c3Desc: 'Real yields generated directly by market liquidity demands, settled by decentralized rules instead of SWIFT bans.',
        c4Title: 'Zero Added Complexity',
        c4Desc: 'You do not need to become an active DeFi wizard. We run the infrastructure, while you keep 100% custody keys.',
      },
      table: {
        title: 'Comparison: Traditional Finance vs This Service',
        tradTitle: 'TRADITIONAL FINANCE',
        fundTitle: 'BASE YIELD FUND SERVICE',
        custody: 'Deposit Custody:',
        custodyTrad: 'Bank holds and lends your money',
        custodyFund: 'You hold 100% custody',
        freezes: 'Account Freezes:',
        freezesTrad: 'Can freeze or block at will',
        freezesFund: 'Censorship-resistant standard',
        seizure: 'Asset Seizure:',
        seizureTrad: 'Subject to localized capital controls',
        seizureFund: 'Public blockchain cryptography',
        inflation: 'Currency Exposure:',
        inflationTrad: 'Single localized country inflation risks',
        inflationFund: 'USDC - Dollar-pegged, global utility',
        return: 'Interest Return:',
        returnTrad: '0.5% Average savings rate',
        returnFund: '4.0% - 40.0% APY ranges',
        identity: 'Identity:',
        identityTrad: 'Local ID, tax records, physical validation',
        identityFund: 'Requires physical internet connection only',
        usdcNote: 'A note on USDC stablecoins: Funds are stored in USDC, fully collateralized with asset pools maintained by Circle (a regulated US firm). Moves freely without processing halts, 24 hours a day, directly on-chain.',
      },
      compliance: {
        tagline: 'AUDITING PROTOCOLS',
        title: 'Pre-trade compliance check',
        subline: 'Before presenting any allocation rebalance recommendation, or signing transactions, our system validates every metrics node.',
        badge: 'SAFETY SIGNAL STATUS: ',
      },
      safeguards: {
        tagline: 'SYSTEM SAFEGUARDS',
        title: 'Tapping into institutional rigor',
        riskBoundsTitle: 'Tiered risk bounds',
        riskBoundsDesc: 'Conservative strategies stay active as your root defaults. Dynamic high-yield vaults require explicit approved credentials.',
        gasBufferTitle: 'Gas Buffer requirement',
        gasBufferDesc: 'We strictly maintain small reserve gas quantities of Ethereum (ETH) in your wallet to confirm withdrawals whenever conditions turn hostile.',
        noAutoTitle: 'No autonomous transactions',
        noAutoDesc: 'The AI scans indexes & builds calldata. Only your physical click commits operations to the blockchain.',
        bottomNote: '*We never ask where you are from. We never audit why you want control of your money. That is your core priority. We ensure standard capital efficacy.',
      },
    },
    transparency: {
      tagline: 'SECTION 06 — TRANSPARENCY',
      title: 'Every number is verifiable. On-chain. By anyone.',
      subline: 'Unlike opaque traditional offshore funds, there is zero room to guess or hide here. Every ledger update can be cross-audited on-chain via public network browsers.',
      c1Title: 'BaseScan browser integration',
      c1Desc: 'Every compounding event, allocation movement, and rebalance can be checked by searching your account address on basescan.org.',
      c2Title: 'Direct Protocol verification links',
      c2Desc: 'Your exact positions can be audited anytime by connecting your ledger keys to morpho.org or moonwell.fi dashboards.',
      badge: 'LIVE SOURCE REFERENCE LINKS',
      links: {
        morpho: 'Morpho Protocol Tracker',
        moonwell: 'Moonwell Dashboard Hub',
        basescan: 'BaseScan L2 Explorer',
      },
    },
    decisions: {
      tagline: 'SECTION 07 — STRATEGY SELECTIONS',
      title: 'Strategy decided by data. Executed by AI. Approved by you.',
      sweepsTitle: 'Daily Sweeps',
      sweepsDesc: 'Our smart scheduler pulls APYs across all protocols, flagging positions where yield drops or utilization spikes.',
      weightsTitle: 'Scoring Weights',
      weightsDesc: 'Candidate pools are graded on expected net APY, TVL buffers, collateral assets quality, target liquidity depth, and gas expenses.',
      boundsTitle: 'Migration Threshold Bounds',
      boundsDesc: 'Rebalances are strictly locked unless expected extra returns coverage transaction gas bounds in under 3 months.',
      card: {
        title: 'AI THRESHOLD PARSER EXAMPLE',
        candidate: 'Rebalance Candidate:',
        gain: 'Expected APY Gain:',
        gas: 'Estimated Total Gas:',
        status: 'Threshold Status:',
        passed: 'THRESHOLD PASSED',
        hint: 'Recommendation prepares automatically and updates on-chain.',
      },
    },
    ownership: {
      tagline: 'SECTION 08 — ACCOUNT OWNERSHIP',
      title: 'You keep your account. We manage the strategy.',
      subline: "This isn't a pooled or opaque collective investment. You do not send us money. Your stablecoins stay situated inside your Base Account (secured by Coinbase abstraction infrastructure) accessible to withdraw anytime.",
      control: 'WHAT YOU CONTROL',
      controlItems: [
        '100% custody of keys',
        'Instant penalty-free withdrawals',
        'Approve or reject allocations',
      ],
      manage: 'WHAT WE MANAGE',
      manageItems: [
        'Daily opportunity checks',
        'Continuous risk mitigation sheets',
        'Precise tax calculations logs',
      ],
      card: {
        title: 'Minimum Requirements',
        minStart: 'Minimum to Start:',
        recBal: 'Recommended Balance:',
        exitLimits: 'Dynamic Exit limits:',
        exitValue: 'Unlimited Instant',
        btn: 'Request Early Access Invitation →',
      },
    },
    faq: {
      tagline: 'SECTION 09 — ACCRUED FAQ',
      title: 'Frequently Answered Questions',
      subline: 'We focus on complete clarity. If you have additional inquiries, connect inside on-chain discussion channels.',
    },
    liveHealth: {
      tagline: 'SECTION 10 — LIVE HEALTH STATUS',
      title: 'On-Chain Capital Accrual Analytics',
      subline: 'Verify composite stats pulled in real-time as our user pool compounding grows.',
      metrics: {
        tvl: 'TOTAL USDC POSITION SIZED',
        tvlSub: 'Real-time on-chain pooling',
        accounts: 'MANAGED SECURE ACCOUNTS',
        accountsSub: 'Direct 100% self-custody active',
        apy: 'AVERAGE PORTFOLIO APY',
        apySub: 'Trailing 30-day net composite',
        txs: 'TRANSACTIONS PROCESSED',
        txsSub: '100% execute safety rate',
      },
      feed: {
        title: 'Live On-Chain Transaction Feed',
        subline: 'Showing recent execution logs on Base Layer-2.',
        badge: 'LIVE LEDGER PULL',
        headers: {
          account: 'Smart Account',
          action: 'Underlying Action',
          volume: 'Volume',
          route: 'Target Route',
          status: 'Accrual Status',
          age: 'Age',
        },
        actions: {
          deposit: 'Deposit',
          rebalance: 'Rebalance',
          compound: 'Yield Compound',
          withdraw: 'Withdraw',
        },
        status: {
          confirmed: 'Confirmed',
          pending: 'Pending',
        },
        times: {
          justNow: 'Just now',
          secondsAgo: 's ago',
          minutesAgo: 'm ago',
        },
      },
    },
    footer: {
      badge: 'JOIN THE INVITE ONLY SELECTION',
      title: 'Ready to put your dollars to work?',
      subline: "Early access is limited to invited accounts. If you received this link from someone you trust, you're already in.",
      cta: 'Request access →',
      disclaimer: 'This service is provided for informational and operational purposes only. It does not constitute investment advice. Cryptocurrency investments carry risk including total loss of principal. Past performance is not indicative of future results. Each participant maintains full self-custody of their funds at all times.',
      copyright: '© 2026 Base Yield Fund. Powered by Coinbase abstractions and Anthropic Model Context Protocol. All rights reserved.',
    },
    modal: {
      close: '[esc] CLOSE',
      badge: 'CONTACT & ACCESS',
      title: 'Contact Base Yield Fund',
      subline: 'Select the purpose of your request to automatically prepare a secure email template.',
      accessTitle: 'Access Waitlist',
      accessDesc: 'Apply for early access. Please specify your planned deposit size in the email template (minimum entry limit is $1,000).',
      accessBtn: 'Prepare request to hello@baseyieldfund.com',
      reportTitle: 'Position Report Request',
      reportDesc: 'Request a detailed statement of active DeFi allocations, performance metrics, and system rebalances.',
      reportBtn: 'Request report from report@baseyieldfund.com',
      legalNote: '*The template will open in your native email client. We never request credentials, seed phrases, or private keys.',
    },
    calculator: {
      badge: 'YIELD CALCULATOR',
      title: 'Test your configuration',
      desc: 'Adjust your allocation amount and appetite parameters to simulate real-time performance.',
      depositLabel: 'Deposit Capital',
      riskLabel: 'Risk Profile Appetite',
      riskTiers: {
        conservative: 'conservative',
        balanced: 'balanced',
        growth: 'growth',
        target: 'APY TARGET',
      },
      disclosure: {
        title: 'Dollar-Denominated Risk Disclosure',
        downsideText: 'Realistic scenario downside on ',
        extraText: ': ',
        safetyStatus: 'Safety status: ',
        levelMinimal: 'Minimal Systemic',
        levelModerate: 'Moderate Borrowing Shift',
        levelElevated: 'Elevated Volatility LP Drift',
        textConservative: 'Conservative vaults leverage top-rated curators. Main risk is pure smart contract code bugs rather than bad-debt liquidations.',
        textBalanced: 'Potential bad-debt event in secondary collateral assets on Moonwell. This represents a robust risk-to-yield ratio.',
        textGrowth: 'Active exposure to trading LP pools (Aerodrome) and leveraged tracer counterparties. Higher yield margin with calculated downside limits.',
      },
      simTitle: 'PROJECTED RETURN SIMULATION',
      apyTitle: 'ESTIMATED APY',
      apyCompiled: 'compiled',
      monthlyTitle: 'MONTHLY EARNINGS',
      weightTitle: 'Fund Allocation Weight',
      disclaimer: '*All allocations automatically stay on your device under strict 100% self-custody. Every strategic migration requires your cryptographically verified hardware-passkey click or approving tap.',
    },
    simulator: {
      walletBadge: 'BASE SMART ACCOUNT',
      connected: 'Connected',
      statusInactive: 'Yield System Inactive',
      descInactive: 'Click the scan trigger in the protocol terminal to launch the real-time AI scanner.',
      btnScan: 'Trigger Live OCR Scan',
      statusActive: 'AI Strategy Engine Scanning',
      reading: 'Reading on-chain live blocks...',
      rebalanceBadge: 'REBALANCE RECOMMENDED',
      ago: 'ago',
      fluidTitle: 'Fluid USDC Lending Yield',
      deltaText: 'delta',
      rebalanceAction: 'Move 30% from Morpho Prime into highly collateralized Fluid Market vaults.',
      gasEstimate: 'Est Gas: <$0.01 USDC',
      slippage: 'Slippage Limit: 0.01%',
      btnApprove: 'Tap to Approve in App',
      btnReject: 'Reject & Ignore Recommendation',
      statusPasskey: 'Confirming with Passkey...',
      descPasskey: 'Awaiting your secure iOS/Android secure hardware lock signature.',
      pendingBiometric: 'Pending user biometric touch signature',
      broadcasting: 'Broadcasting Calldata',
      descBroadcasting: 'Bundling operations into ERC-4337 smart-transaction block on Base.',
      completeTitle: 'Rebalance Completed',
      completeDesc: 'Your USDC has been successfully rebalanced. Yield is compounding live on-chain.',
      resolvedBadge: 'TRANSACTION BUNDLE RESOLVED',
      btnReset: 'Reset Simulator',
      power: 'Powered by Coinbase Base SDK',
      strategyBadge: 'CLAUDE AI + BASE MCP STRATEGY ENGINE',
      strategyTitle: 'Strategy Scanner Pipeline',
      outputTab: 'Output',
      flowTab: 'Risk Flow',
      logs: {
        init: 'STG-ENG >> Initializing Base Blockchain MCP Context...',
        risk: 'STG-ENG >> Loading user risk appetite: [BALANCED]...',
        morphoScan: 'CORE-SCAN >> Pulling live state from Morpho Curated Vaults... [TVL $412M] APY: 4.5%',
        moonwellScan: 'CORE-SCAN >> Pulling live state from Moonwell USDC lending... [TVL $15.4M] APY: 9.3%',
        fluidScan: 'CORE-SCAN >> Pulling live state from Fluid Protocol markets... [TVL $12.8M] APY: 6.8% (Spiking ⬆)',
        rule: 'STG-ENG >> Evaluating rebalance threshold rule... Delta > 1.5% APY net of gas',
        alert: 'STG-ENG >> [ALERT] Actionable opportunity detected in Fluid Vaults.',
        auth: 'USER-AUTH >> Cryptographic verification requested from Coinbase Smart Wallet...',
        wait: 'USER-AUTH >> Waiting for passkey user response...',
        calldata: 'STG-TX >> Calldata generated successfully. Operation: batchDepositFluidUSDC()',
        submit: 'STG-TX >> Submitting ERC-4337 smart-account userOperation to Base bundler...',
        confirm: 'STG-TX >> Bundler block confirmation detected. Tx Hash: 0xfdb1a4e27b9c99120ffc914b',
        resolved: 'STG-TX >> On-chain yield accrual activated. Portfolio rebalance resolved.',
        idle: 'Terminal state idle. Ready for command initiation.',
        hint: 'Click the "Trigger Live OCR Scan" button in the Smart Wallet phone view...',
      },
      card: {
        title: 'OPPORTUNITY SCORECARD',
        routed: 'NET ROUTED',
        margin: 'Yield APY Margin: +2.3% APY',
        safety: 'Curator Safety: A+ (Gauntlet Curated)',
        solvency: 'Solvency Cap: Perfect Overcollateralized',
        solvencyValue: 'Perfect Overcollateralized',
        exit: 'Exit Liquidity Queue: <1 Minute',
        exitValue: 'Exit Liquidity Queue: <1 Minute',
        complianceTitle: 'MCP PRE-FLIGHT BOUND CHECKLIST',
        complianceStatus: '6/6 PASS',
        checklist: [
          'Target Vault Age exceeds 6+ months limit',
          'Zero leverage in prepared calldata contract',
          'Stablecoin peg deviation stays & fraction < 0.1%',
        ],
      },
      bottomNote: 'This simulator runs directly in safety sandbox. It portrays the real-time interaction between our strategy scanning models and your secure Coinbase Smart Account.',
    },
    protocols: [
      {
        id: 'aave',
        name: 'Aave v3 / Spark',
        strategy: 'USDC lending & Blue-chip yield',
        expectedApy: 3.5,
        tvl: '$30M+ (Aave) / $222M+ (Spark)',
        riskTier: 'Conservative',
        badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
        textColor: 'text-green-400',
        description: 'Battle-tested blue-chip lending protocols with deep liquidity. The safest options with lower yields but maximum established audit histories in DeFi.'
      },
      {
        id: 'morpho-prime',
        name: 'Morpho (Gauntlet / Steakhouse Prime)',
        strategy: 'Curated vault lending',
        expectedApy: 4.5,
        tvl: '$370M - $456M',
        riskTier: 'Conservative',
        badgeColor: 'bg-green-500/10 text-green-400 border-green-500/20',
        textColor: 'text-green-400',
        description: 'Deploys USDC into curated vaults managed by top-tier risk companies like Gauntlet and Steakhouse Finance. Lends to institutional borrowers against overcollateralized assets.'
      },
      {
        id: 'morpho-high-yield',
        name: 'Morpho (High Yield Vaults)',
        strategy: 'Curated vault lending',
        expectedApy: 6.0,
        tvl: '$4M - $25M',
        riskTier: 'Moderate',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        textColor: 'text-blue-400',
        description: 'Higher targeted yield lending vaults with managed smart-contract risks and hand-selected underlying borrowers.'
      },
      {
        id: 'fluid',
        name: 'Fluid Protocol',
        strategy: 'Optimized lending market',
        expectedApy: 6.5,
        tvl: '$12M+',
        riskTier: 'Moderate',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        textColor: 'text-blue-400',
        description: 'Next-generation token lending mechanism that dynamically and intelligently routes capital between multiple borrowers to maximize capital utilization rates.'
      },
      {
        id: 'moonwell',
        name: 'Moonwell Protocol',
        strategy: 'Direct USDC lending',
        expectedApy: 9.5,
        tvl: '$15M+',
        riskTier: 'Moderate',
        badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        textColor: 'text-blue-400',
        description: 'Leading Base-native lending market. Yield responds directly to on-chain credit demand, consistently producing high returns during periods of market activity.'
      },
      {
        id: 'morpho-specialty',
        name: 'Morpho (OUSD / Niche Vaults)',
        strategy: 'Specialty lending vaults',
        expectedApy: 8.0,
        tvl: '$2M+',
        riskTier: 'Elevated',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        textColor: 'text-amber-400',
        description: 'Specialty asset categories providing elevated margins. Managed closer to liquidity boundaries but offering strong yield multipliers.'
      },
      {
        id: 'avantis',
        name: 'Avantis',
        strategy: 'Perps liquidity vault',
        expectedApy: 11.5,
        tvl: '$45M+',
        riskTier: 'Elevated',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        textColor: 'text-amber-400',
        description: 'Liquidity providers serve as the counterparty for decentralized leveraged perp traders. Earns consistent income from trader losses and open interest fees.'
      },
      {
        id: 'aerodrome',
        name: 'Aerodrome (Stable LPs)',
        strategy: 'USDC/USDT trading fees',
        expectedApy: 30.0,
        tvl: '$1M - $8M',
        riskTier: 'Active',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
        textColor: 'text-rose-400',
        description: 'Deploys concentrated liquidity into stablecoin pairings on Base\'s dominant decentralized exchange, collecting direct real-time trading volumes as fees.'
      }
    ],
    riskProfiles: {
      conservative: {
        name: 'Conservative Strategy',
        description: 'Targeted maximum preservation of capital using gold-standard blue chip DeFi vaults and highly collateralized institutional lending parameters.',
        expectedApyRange: [4.0, 5.0],
        allocations: [
          { percentage: 60, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Conservative anchor' },
          { percentage: 40, protocolName: 'Aave v3 / Spark', apy: 3.5, role: 'Liquidity buffer' }
        ],
        riskDiscussions: 'This strategy is highly immune to liquidity limits. Main risks are restricted strictly to underlying smart contract integrity across Aave and Morpho blueprints.'
      },
      balanced: {
        name: 'Balanced Strategy',
        description: 'Focuses on higher average yields by distributing your stablecoins between conservative anchors and high-liquidity lending hubs like Moonwell and Fluid.',
        expectedApyRange: [7.0, 9.5],
        allocations: [
          { percentage: 40, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Conservative anchor' },
          { percentage: 35, protocolName: 'Moonwell Protocol', apy: 9.5, role: 'Yield engine' },
          { percentage: 15, protocolName: 'Fluid Protocol', apy: 6.5, role: 'Capital router' },
          { percentage: 10, protocolName: 'Aave v3 / Spark', apy: 3.5, role: 'Capital safety' }
        ],
        riskDiscussions: 'Balances robust yield and strong capital protections. Risk is moderately exposed to changing borrower demand and utilization rates.'
      },
      growth: {
        name: 'Growth Strategy',
        description: 'Intelligently utilizes market fees, leveraged-trading counterparties, and dynamic trading volume pools to yield maximum interest rates.',
        expectedApyRange: [11.0, 25.0],
        allocations: [
          { percentage: 30, protocolName: 'Aerodrome (Stable LPs)', apy: 30.0, role: 'Active fee accrual' },
          { percentage: 30, protocolName: 'Avantis', apy: 11.5, role: 'Traders counterparty' },
          { percentage: 20, protocolName: 'Moonwell Protocol', apy: 9.5, role: 'Yield engine' },
          { percentage: 20, protocolName: 'Morpho (Gauntlet / Steakhouse Prime)', apy: 4.5, role: 'Conservative anchor' }
        ],
        riskDiscussions: 'High returns backed by direct retail trade volumes. Subject to LP range drift and dynamic perp market adjustments. Risk mitigation applied through tight bounds checks.'
      }
    },
    faqs: [
      {
        question: 'Is my money safe?',
        answer: 'Your funds remain in your Base Account — a Coinbase-secured smart contract wallet (ERC-4337). We never have direct custody of your funds. Every transaction, allocation shift, or withdrawal requires your explicit cryptographically signed approval.'
      },
      {
        question: 'What if I want to stop and withdraw?',
        answer: 'You can withdraw at any time. There are no lockups, and you hold the keys. Morpho and Moonwell withdrawals typically process within minutes back to your main wallet. During rare high-utilization periods on certain lending markets, it could take a bit longer, which is why we maintain liquid margins.'
      },
      {
        question: 'What are the fees?',
        answer: 'The underlying DeFi protocols (such as Morpho and Moonwell) charge natural raw performance fees (0–15%) on yield, which is already deducted from the APY figures shown. Our fund platform charges a modest fee only on yield successfully generated.'
      },
      {
        question: 'What are the core risks involved?',
        answer: 'Each tier represents a different risk level. Conservative tiers (Aave, Morpho Prime) have virtually zero liquidation threat; the main risk is systemic smart contract exploits. Elevated and Active tiers (such as Avantis and Aerodrome) involve dynamic liquidity variables, liquidity lock variations, and market trading results. We quantify realistic dollar downside estimates in plain numbers before every single recommendation so you can make informed decisions.'
      },
      {
        question: 'Do I need to be a DeFi expert or have on-chain experience?',
        answer: 'Not at all. You only need a Coinbase account or compatible smart wallet app. Our dashboard prepares the transaction calldata, performs on-chain scans, and does the complex heavy lifting; you just approve recommendations with one tap.'
      },
      {
        question: 'How are taxes handled?',
        answer: 'We provide automated, detailed tax event tracking. Every deposit, yield payout, rebalance, and on-chain fee is captured in an elegant, structured format that is ready to download and share with your CPA at the end of the year.'
      }
    ],
    notDoPrinciples: [
      {
        title: 'Zero Leverage or Borrowing',
        desc: 'We never borrow against your collateral or leverage your current positions.'
      },
      {
        title: 'No Meme Tokens & Hype Contracts',
        desc: 'We strictly interact with established stablecoin-denominated smart vaults with clean histories.'
      },
      {
        title: 'No Blind Entry into Extreme APYs',
        desc: 'Dynamic positions with high annual yield are scanned rigorously for collateral backing before capital entry.'
      },
      {
        title: 'Zero Illiquid Lockups',
        desc: 'Your USDC stays highly accessible, so you can exit when times are volatile or when you need fast liquid cash.'
      }
    ],
    preTradeChecks: [
      'Confirm protocol TVL exceeds safety thresholds ($10M+ core, $50M+ total system)',
      'Verify clean historical audit trail and time-in-production factors (12+ months standard)',
      'Assert collateral health values with Gauntlet or Steakhouse Finance API telemetry models',
      'Ensure current utilization rate stays below critical exit-liquidation thresholds',
      'Project exact transaction gas relative to expected daily yield delta (rebalance must cover gas in <3 months)',
      'Map exit routing strategy and buffer dynamic protocol exit queues'
    ]
  }
};
