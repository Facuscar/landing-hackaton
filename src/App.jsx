import { useState, useMemo } from "react";

const C = { navy: "#002C65", blue: "#0062DE", light: "#D7ECFE", dark: "#001533" };
const font = "'Plus Jakarta Sans', 'Inter', sans-serif";

const ASSET_LOGOS = {
  "T17O5": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "BPOD7": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "MSFT": "https://assets.cocos.capital/cocos/logos/MSFT.jpg",
  "NVDA": "https://assets.cocos.capital/cocos/logos/NVDA.jpg",
  "AAPL": "https://assets.cocos.capital/cocos/logos/AAPL.jpg",
  "KO": "https://assets.cocos.capital/cocos/logos/KO.jpg",
  "GOOGL": "https://assets.cocos.capital/cocos/logos/GOOGL.jpg",
  "BMA": "https://assets.cocos.capital/cocos/logos/BMA.jpg",
  "GLOB": "https://assets.cocos.capital/cocos/logos/GLNT.jpg",
  "GGAL": "https://assets.cocos.capital/cocos/logos/GGAL_1.jpg",
  "TGSU2": "https://assets.cocos.capital/cocos/logos/1558033661319.jpeg",
  "TXAR": "https://assets.cocos.capital/cocos/logos/TXAR.jpg",
  "AL30": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "CEPU": "https://assets.cocos.capital/cocos/logos/CEPU_nuevo.jpg",
  "DICP": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "ALUA": "https://assets.cocos.capital/cocos/logos/ALUA.jpg",
  "GD35": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "PAMP": "https://assets.cocos.capital/cocos/logos/PAMP.jpg",
  "S31E5": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "MELI": "https://assets.cocos.capital/cocos/logos/MELI.jpg",
  "AE38": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "GD30": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "YPF": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "YPFAO": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "PAMPAR": "https://assets.cocos.capital/cocos/logos/PAMP.jpg",
  "TLCMO": "https://assets.cocos.capital/cocos/logos/TECO2.jpg",
  "S23Y5": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "X18L5": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "S27J5": "https://assets.cocos.capital/cocos/logos/ARG.jpg",
  "IRSA": "https://assets.cocos.capital/cocos/logos/IRSA.jpg",
};

const ACTIVOS = [
  { id:"GGAL", instrumento:"accion", general:{ nombre:"Grupo Financiero Galicia", ticker:"GGAL", sector:"Bancario", logo_emoji:"🏦", descripcion:"Uno de los principales grupos financieros de Argentina. Opera a través del Banco Galicia ofreciendo servicios bancarios, seguros y créditos.", ceo:"Fabián Kon", directivos:[{cargo:"CEO",nombre:"Fabián Kon"},{cargo:"CFO",nombre:"Hernán Berdini"},{cargo:"Presidente del Directorio",nombre:"Eduardo Escasany"}]}, precio:{ valor:1.85, moneda:"USD", variacion_diaria_pct:4.2, variacion_ytd_pct:31.0, semana_52:{min:0.98,max:2.10}, volumen_operado_ars:125000000, volumen_media_30d_ars:98000000, volumen_vs_media_pct:27.6}, fundamentals:{ market_cap_usd_mm:2100, earnings_usd_mm:184, earnings_periodo:"2024", crecimiento_ingresos_pct:31, pe:7.2, pb:1.4, roe_pct:19, dividend_yield_pct:2.1, dividendo_proximo_pago:"2025-05-15", free_float_pct:42}, noticias:"Presentó resultados anuales con aumento en depósitos. Expandió su cartera de créditos personales. El sector bancario fue afectado por cambios en la política monetaria del BCRA."},
  { id:"BMA", instrumento:"accion", general:{ nombre:"Banco Macro", ticker:"BMA", sector:"Bancario", logo_emoji:"🏛️", descripcion:"Banco privado argentino con fuerte presencia en el interior del país. Ofrece servicios financieros a individuos, empresas y al sector agropecuario.", ceo:"Gustavo Manriquez", directivos:[{cargo:"CEO",nombre:"Gustavo Manriquez"},{cargo:"CFO",nombre:"Diego Prieto"},{cargo:"Presidente del Directorio",nombre:"Jorge Brito (h)"}]}, precio:{ valor:2.98, moneda:"USD", variacion_diaria_pct:1.5, variacion_ytd_pct:24.0, semana_52:{min:1.65,max:3.40}, volumen_operado_ars:98000000, volumen_media_30d_ars:81000000, volumen_vs_media_pct:21.0}, fundamentals:{ market_cap_usd_mm:1800, earnings_usd_mm:210, earnings_periodo:"2024", crecimiento_ingresos_pct:24, pe:6.8, pb:1.1, roe_pct:16, dividend_yield_pct:2.1, dividendo_proximo_pago:"2025-06-10", free_float_pct:38}, noticias:"Anunció apertura de sucursales en nuevas provincias. Incrementó su cartera de préstamos al agro. Reportó aumento en la morosidad de créditos al consumo en el último trimestre."},
  { id:"YPF", instrumento:"accion", general:{ nombre:"YPF S.A.", ticker:"YPF", sector:"Energía / Petróleo", logo_emoji:"⛽", descripcion:"Principal empresa de energía de Argentina, de mayoría estatal. Extrae, refina y comercializa petróleo, gas y combustibles en todo el país.", ceo:"Horacio Marín", directivos:[{cargo:"CEO",nombre:"Horacio Marín"},{cargo:"CFO",nombre:"Federico Barroetaveña"}]}, precio:{ valor:38.50, moneda:"USD", variacion_diaria_pct:-1.1, variacion_ytd_pct:18.0, semana_52:{min:28.00,max:52.00}, volumen_operado_ars:340000000, volumen_media_30d_ars:410000000, volumen_vs_media_pct:-17.1}, fundamentals:{ market_cap_usd_mm:15400, earnings_usd_mm:1200, earnings_periodo:"2024", pe:5.1, pb:0.9, roe_pct:11, dividend_yield_pct:0, dividendo_proximo_pago:null}, noticias:"Continuó con la expansión de producción en Vaca Muerta. Anunció acuerdo con empresas internacionales para exportación de GNL."},
  { id:"PAMP", instrumento:"accion", general:{ nombre:"Pampa Energía", ticker:"PAMP", sector:"Energía", logo_emoji:"⚡", descripcion:"Empresa energética integrada argentina. Genera electricidad, produce gas y opera oleoductos.", ceo:"Gustavo Mariani", directivos:[{cargo:"CEO",nombre:"Gustavo Mariani"},{cargo:"CFO",nombre:"Diego Rodríguez"},{cargo:"Presidente del Directorio",nombre:"Marcelo Mindlin"}]}, precio:{ valor:12.40, moneda:"USD", variacion_diaria_pct:-0.4, variacion_ytd_pct:12.0, semana_52:{min:9.20,max:15.80}, volumen_operado_ars:210000000, volumen_media_30d_ars:190000000, volumen_vs_media_pct:10.5}, fundamentals:{ market_cap_usd_mm:3700, earnings_usd_mm:320, earnings_periodo:"2024", pe:9.3, pb:1.6, roe_pct:14, dividend_yield_pct:0, dividendo_proximo_pago:null}, noticias:"Finalizó obras de ampliación en planta de ciclo combinado. El gobierno revisó tarifas eléctricas afectando ingresos proyectados."},
  { id:"TXAR", instrumento:"accion", general:{ nombre:"Ternium Argentina", ticker:"TXAR", sector:"Industria / Acero", logo_emoji:"🏗️", descripcion:"Productora de acero plano y productos de hierro. Abastece a las industrias automotriz, de la construcción y electrodomésticos.", ceo:"Máximo Vedoya", directivos:[{cargo:"CEO Regional",nombre:"Máximo Vedoya"},{cargo:"CFO",nombre:"Pablo Brizzio"}]}, precio:{ valor:8.75, moneda:"USD", variacion_diaria_pct:0.8, variacion_ytd_pct:-8.0, semana_52:{min:6.10,max:11.20}, volumen_operado_ars:55000000, volumen_media_30d_ars:62000000, volumen_vs_media_pct:-11.3}, fundamentals:{ market_cap_usd_mm:890, earnings_usd_mm:-45, earnings_periodo:"2024", pe:null, pb:0.7, roe_pct:-4, dividend_yield_pct:0, dividendo_proximo_pago:null}, noticias:"La caída en la actividad de la construcción redujo la demanda de acero. Exportó volúmenes récord a Brasil."},
  { id:"ALUA", instrumento:"accion", general:{ nombre:"Aluar Aluminio Argentino", ticker:"ALUA", sector:"Industria / Aluminio", logo_emoji:"🔩", descripcion:"Única productora de aluminio primario de Argentina. Exporta más del 70% de su producción.", ceo:"Martín Berardi", directivos:[{cargo:"CEO",nombre:"Martín Berardi"},{cargo:"Presidente del Directorio",nombre:"Javier Madanes Quintanilla"}]}, precio:{ valor:1.45, moneda:"USD", variacion_diaria_pct:2.3, variacion_ytd_pct:9.0, semana_52:{min:0.98,max:1.82}, volumen_operado_ars:88000000, volumen_media_30d_ars:74000000, volumen_vs_media_pct:18.9}, fundamentals:{ market_cap_usd_mm:950, earnings_usd_mm:95, earnings_periodo:"2024", pe:10.1, pb:1.3, roe_pct:12, dividend_yield_pct:3.2, dividendo_proximo_pago:"2025-04-22"}, noticias:"Se benefició de la suba del aluminio en mercados internacionales. Anunció plan de inversión en capacidad productiva."},
  { id:"CEPU", instrumento:"accion", general:{ nombre:"Central Puerto", ticker:"CEPU", sector:"Energía / Generación Eléctrica", logo_emoji:"🔌", descripcion:"Mayor generadora termoeléctrica privada de Argentina. Opera centrales de ciclo combinado, turbovapor y turbinas de gas.", ceo:"Gabriel Cohen", directivos:[{cargo:"CEO",nombre:"Gabriel Cohen"},{cargo:"CFO",nombre:"Matías Mosse"}]}, precio:{ valor:6.80, moneda:"USD", variacion_diaria_pct:1.2, variacion_ytd_pct:15.0, semana_52:{min:4.90,max:8.40}, volumen_operado_ars:72000000, volumen_media_30d_ars:65000000, volumen_vs_media_pct:10.8}, fundamentals:{ market_cap_usd_mm:1100, earnings_usd_mm:130, earnings_periodo:"2024", pe:8.5, pb:1.2, roe_pct:13, dividend_yield_pct:4.0, dividendo_proximo_pago:"2025-05-08"}, noticias:"Ganó licitaciones para nueva capacidad de generación. Anunció dividendo extraordinario por resultados del año."},
  { id:"TGSU2", instrumento:"accion", general:{ nombre:"Transportadora de Gas del Sur", ticker:"TGSU2", sector:"Energía / Gas", logo_emoji:"🔧", descripcion:"Opera el mayor sistema de transporte de gas natural de Argentina. Conecta Neuquén y el sur del país con Buenos Aires.", ceo:"Alejandro Basso", directivos:[{cargo:"CEO",nombre:"Alejandro Basso"},{cargo:"Presidente del Directorio",nombre:"Sebastián Tempone"}]}, precio:{ valor:3.20, moneda:"USD", variacion_diaria_pct:0.5, variacion_ytd_pct:22.0, semana_52:{min:2.10,max:4.10}, volumen_operado_ars:61000000, volumen_media_30d_ars:54000000, volumen_vs_media_pct:13.0}, fundamentals:{ market_cap_usd_mm:850, earnings_usd_mm:110, earnings_periodo:"2024", pe:7.7, pb:1.1, roe_pct:15, dividend_yield_pct:3.5, dividendo_proximo_pago:"2025-06-01"}, noticias:"Renegociación tarifaria con ENARGAS mejoró perspectivas de ingresos. Expansión de gasoducto Néstor Kirchner beneficia sus flujos."},
  { id:"MELI-CEDEAR", instrumento:"cedear", general:{ nombre:"MercadoLibre", ticker:"MELI", sector:"Tecnología / E-commerce", logo_emoji:"🛒", descripcion:"La plataforma de e-commerce y pagos más grande de Latinoamérica. Opera en 18 países con marketplace, Mercado Pago y logística propia.", ceo:"Marcos Galperin", directivos:[{cargo:"CEO",nombre:"Marcos Galperin"},{cargo:"CFO",nombre:"Martín de los Santos"}]}, precio:{ valor:2150000, moneda:"ARS", subyacente_usd:2150, variacion_diaria_pct:2.8, variacion_ytd_pct:18.5, semana_52:{min:1480000,max:2380000}, volumen_operado_ars:430000000, volumen_media_30d_ars:380000000, volumen_vs_media_pct:13.2}, cedear_info:{ ratio_cedear:1, bolsa_origen:"NASDAQ" }, fundamentals:{ market_cap_usd_mm:109000, earnings_usd_mm:4800, earnings_periodo:"2024", pe:58, pb:18.2, roe_pct:31, dividend_yield_pct:0, dividendo_proximo_pago:null}, noticias:"Reportó crecimiento récord en volumen de pagos digitales. Mercado Crédito superó los 50 millones de préstamos otorgados."},
  { id:"AAPL-CEDEAR", instrumento:"cedear", general:{ nombre:"Apple Inc.", ticker:"AAPL", sector:"Tecnología", logo_emoji:"🍎", descripcion:"La empresa de tecnología más valiosa del mundo. Fabrica iPhone, Mac y servicios digitales.", ceo:"Tim Cook", directivos:[{cargo:"CEO",nombre:"Tim Cook"},{cargo:"CFO",nombre:"Luca Maestri"}]}, precio:{ valor:187000, moneda:"ARS", subyacente_usd:187, variacion_diaria_pct:0.6, variacion_ytd_pct:9.2, semana_52:{min:142000,max:210000}, volumen_operado_ars:215000000, volumen_media_30d_ars:195000000, volumen_vs_media_pct:10.3}, cedear_info:{ ratio_cedear:8, bolsa_origen:"NASDAQ" }, fundamentals:{ market_cap_usd_mm:2900000, earnings_usd_mm:97000, earnings_periodo:"FY2024", pe:29.1, pb:47.3, roe_pct:160, dividend_yield_pct:0.5, dividendo_proximo_pago:"2025-02-13"}, noticias:"Presentó resultados del Q1 2025 superando expectativas. Apple Intelligence impulsó ventas de iPhone 16."},
  { id:"MSFT-CEDEAR", instrumento:"cedear", general:{ nombre:"Microsoft Corporation", ticker:"MSFT", sector:"Tecnología", logo_emoji:"🪟", descripcion:"Líder global en software, servicios en la nube Azure e inteligencia artificial con Copilot.", ceo:"Satya Nadella", directivos:[{cargo:"CEO",nombre:"Satya Nadella"},{cargo:"CFO",nombre:"Amy Hood"}]}, precio:{ valor:412000, moneda:"ARS", subyacente_usd:412, variacion_diaria_pct:0.7, variacion_ytd_pct:16.0, semana_52:{min:320000,max:478000}, volumen_operado_ars:285000000, volumen_media_30d_ars:260000000, volumen_vs_media_pct:9.6}, cedear_info:{ ratio_cedear:10, bolsa_origen:"NASDAQ" }, fundamentals:{ market_cap_usd_mm:3060000, earnings_usd_mm:88100, earnings_periodo:"FY2024", pe:35, pb:13.2, roe_pct:38, dividend_yield_pct:0.8, dividendo_proximo_pago:"2025-03-13"}, noticias:"Copilot integrado en toda la suite Office. Azure creció 29% anual. Inversión en OpenAI sigue generando retornos."},
  { id:"NVDA-CEDEAR", instrumento:"cedear", general:{ nombre:"NVIDIA Corporation", ticker:"NVDA", sector:"Tecnología / Semiconductores", logo_emoji:"🟢", descripcion:"Líder mundial en chips de inteligencia artificial, GPUs y plataformas de computación acelerada.", ceo:"Jensen Huang", directivos:[{cargo:"CEO",nombre:"Jensen Huang"},{cargo:"CFO",nombre:"Colette Kress"}]}, precio:{ valor:115000, moneda:"ARS", subyacente_usd:115, variacion_diaria_pct:3.5, variacion_ytd_pct:114.0, semana_52:{min:68000,max:142000}, volumen_operado_ars:510000000, volumen_media_30d_ars:445000000, volumen_vs_media_pct:14.6}, cedear_info:{ ratio_cedear:10, bolsa_origen:"NASDAQ" }, fundamentals:{ market_cap_usd_mm:2820000, earnings_usd_mm:72880, earnings_periodo:"FY2025", pe:52, pb:32.5, roe_pct:63, dividend_yield_pct:0.1, dividendo_proximo_pago:"2025-03-28"}, noticias:"Demanda de chips H100/H200 para centros de datos de IA supera la oferta. Blackwell architecture en producción masiva."},
  { id:"GOOGL-CEDEAR", instrumento:"cedear", general:{ nombre:"Alphabet Inc. (Google)", ticker:"GOOGL", sector:"Tecnología", logo_emoji:"🔵", descripcion:"Dueña de Google, YouTube, Google Cloud y Waymo. Líder global en búsqueda online y publicidad digital.", ceo:"Sundar Pichai", directivos:[{cargo:"CEO",nombre:"Sundar Pichai"},{cargo:"CFO",nombre:"Anat Ashkenazi"}]}, precio:{ valor:176000, moneda:"ARS", subyacente_usd:176, variacion_diaria_pct:0.9, variacion_ytd_pct:14.0, semana_52:{min:128000,max:204000}, volumen_operado_ars:198000000, volumen_media_30d_ars:178000000, volumen_vs_media_pct:11.2}, cedear_info:{ ratio_cedear:10, bolsa_origen:"NASDAQ" }, fundamentals:{ market_cap_usd_mm:2180000, earnings_usd_mm:73800, earnings_periodo:"FY2024", pe:22, pb:7.1, roe_pct:32, dividend_yield_pct:0.5, dividendo_proximo_pago:"2025-03-27"}, noticias:"Avances en IA con Gemini. Crecimiento acelerado en Google Cloud. Litigios antimonopolio en EE.UU."},
  { id:"GLOB-CEDEAR", instrumento:"cedear", general:{ nombre:"Globant S.A.", ticker:"GLOB", sector:"Tecnología / IT Services", logo_emoji:"🌐", descripcion:"Empresa tecnológica de origen argentino líder en servicios digitales y transformación tecnológica. Cotiza en NYSE.", ceo:"Martín Migoya", directivos:[{cargo:"CEO",nombre:"Martín Migoya"},{cargo:"CFO",nombre:"Juan Urthiague"}]}, precio:{ valor:182000, moneda:"ARS", subyacente_usd:182, variacion_diaria_pct:1.9, variacion_ytd_pct:18.0, semana_52:{min:135000,max:220000}, volumen_operado_ars:110000000, volumen_media_30d_ars:92000000, volumen_vs_media_pct:19.6}, cedear_info:{ ratio_cedear:10, bolsa_origen:"NYSE" }, fundamentals:{ market_cap_usd_mm:7100, earnings_usd_mm:185, earnings_periodo:"2024", pe:37, pb:5.8, roe_pct:16, dividend_yield_pct:0, dividendo_proximo_pago:null}, noticias:"Ganó contratos con Disney y FIFA para plataformas digitales. Aceleró contratación en Latinoamérica."},
  { id:"KO-CEDEAR", instrumento:"cedear", general:{ nombre:"The Coca-Cola Company", ticker:"KO", sector:"Consumo / Bebidas", logo_emoji:"🥤", descripcion:"Líder global en bebidas no alcohólicas. Distribuye más de 500 marcas en más de 200 países.", ceo:"James Quincey", directivos:[{cargo:"CEO",nombre:"James Quincey"},{cargo:"CFO",nombre:"John Murphy"}]}, precio:{ valor:62000, moneda:"ARS", subyacente_usd:62, variacion_diaria_pct:0.3, variacion_ytd_pct:3.0, semana_52:{min:51000,max:72000}, volumen_operado_ars:75000000, volumen_media_30d_ars:68000000, volumen_vs_media_pct:10.3}, cedear_info:{ ratio_cedear:10, bolsa_origen:"NYSE" }, fundamentals:{ market_cap_usd_mm:268000, earnings_usd_mm:10600, earnings_periodo:"2024", pe:24, pb:10.9, roe_pct:45, dividend_yield_pct:3.1, dividendo_proximo_pago:"2025-04-01"}, noticias:"Aumentó precios en mercados emergentes. Dividendo sostenido por 60 años consecutivos."},
  { id:"GD30", instrumento:"bono_soberano", general:{ nombre:"Bono Soberano Global 2030", ticker:"GD30", sector:"Deuda Soberana", logo_emoji:"📄", descripcion:"Bono del Estado Nacional argentino bajo ley de Nueva York con vencimiento en 2030.", emisor:"República Argentina"}, precio:{ valor:70.80, moneda:"USD", variacion_diaria_pct:0.9, variacion_ytd_pct:12.3, semana_52:{min:55,max:78}, volumen_operado_ars:890000000}, bono_info:{ tir_pct:10.8, duracion_anios:4.1, vencimiento:"2030-07-09", cupon_pct:0.5, ley:"Nueva York", paridad_pct:70.8, calificacion_crediticia:"CCC", amortizacion:"Semestral desde 2024", proximo_pago_cupon:"2025-07-09", proximo_pago_monto_usd:2.50}, noticias:"El riesgo país bajó 40 puntos tras acuerdo con FMI. Fuerte demanda de inversores locales e internacionales."},
  { id:"AL30", instrumento:"bono_soberano", general:{ nombre:"Bono Soberano Argentina 2030 (Ley Argentina)", ticker:"AL30", sector:"Deuda Soberana", logo_emoji:"📄", descripcion:"Bono soberano bajo ley argentina con vencimiento en 2030. Mismo flujo que GD30 pero menor protección legal.", emisor:"República Argentina"}, precio:{ valor:68.50, moneda:"USD", variacion_diaria_pct:0.7, variacion_ytd_pct:11.5, semana_52:{min:52,max:76}, volumen_operado_ars:1200000000}, bono_info:{ tir_pct:11.2, duracion_anios:4.1, vencimiento:"2030-07-09", cupon_pct:0.5, ley:"Argentina", paridad_pct:68.5, calificacion_crediticia:"CCC", amortizacion:"Semestral desde 2024", proximo_pago_cupon:"2025-07-09", proximo_pago_monto_usd:2.50}, noticias:"Spread soberano se comprimió. Alta liquidez en mercado local."},
  { id:"GD35", instrumento:"bono_soberano", general:{ nombre:"Bono Soberano Global 2035", ticker:"GD35", sector:"Deuda Soberana", logo_emoji:"📄", descripcion:"Bono soberano argentino bajo ley de Nueva York con vencimiento en 2035. Mayor duration que GD30.", emisor:"República Argentina"}, precio:{ valor:64.20, moneda:"USD", variacion_diaria_pct:1.0, variacion_ytd_pct:14.1, semana_52:{min:48,max:72}, volumen_operado_ars:620000000}, bono_info:{ tir_pct:11.7, duracion_anios:6.8, vencimiento:"2035-07-09", cupon_pct:3.625, ley:"Nueva York", paridad_pct:64.2, calificacion_crediticia:"CCC", amortizacion:"Semestral desde 2029", proximo_pago_cupon:"2025-07-09", proximo_pago_monto_usd:18.13}, noticias:"Fuerte interés de inversores extranjeros en la curva larga."},
  { id:"AE38", instrumento:"bono_soberano", general:{ nombre:"Bono Soberano Argentina 2038 (Ley Local)", ticker:"AE38", sector:"Deuda Soberana", logo_emoji:"📄", descripcion:"Bono soberano de largo plazo bajo ley local con vencimiento en 2038. Cupones crecientes.", emisor:"República Argentina"}, precio:{ valor:58.10, moneda:"USD", variacion_diaria_pct:0.5, variacion_ytd_pct:10.8, semana_52:{min:42,max:65}, volumen_operado_ars:380000000}, bono_info:{ tir_pct:12.9, duracion_anios:8.2, vencimiento:"2038-01-09", cupon_pct:4.25, ley:"Argentina", paridad_pct:58.1, calificacion_crediticia:"CCC", amortizacion:"Bullet", proximo_pago_cupon:"2026-01-09", proximo_pago_monto_usd:21.25}, noticias:"El tramo ultra largo tiene mayor volatilidad pero potencial de upside ante mejora del riesgo país."},
  { id:"DICP", instrumento:"bono_soberano", general:{ nombre:"Discount CER Ley Local", ticker:"DICP", sector:"Deuda Soberana", logo_emoji:"📄", descripcion:"Bono soberano ajustado por CER (inflación). Emitido en el canje de 2005, vence en 2033.", emisor:"República Argentina"}, precio:{ valor:480, moneda:"ARS", variacion_diaria_pct:0.3, variacion_ytd_pct:9.5, semana_52:{min:380,max:520}, volumen_operado_ars:290000000}, bono_info:{ tir_pct:8.1, duracion_anios:5.3, vencimiento:"2033-12-31", cupon_pct:5.83, ley:"Argentina", paridad_pct:105.2, calificacion_crediticia:"CCC", amortizacion:"Semestral", proximo_pago_cupon:"2025-06-30", tipo_ajuste:"CER"}, noticias:"Sube la demanda de instrumentos CER ante expectativas de inflación persistente."},
  { id:"BPOD7", instrumento:"bono_soberano", general:{ nombre:"Bono Provincia de Buenos Aires 2027", ticker:"BPOD7", sector:"Deuda Provincial", logo_emoji:"📄", descripcion:"Bono de la Provincia de Buenos Aires bajo ley local con vencimiento en 2027.", emisor:"Provincia de Buenos Aires"}, precio:{ valor:74.20, moneda:"USD", variacion_diaria_pct:0.4, variacion_ytd_pct:8.2, semana_52:{min:58,max:80}, volumen_operado_ars:145000000}, bono_info:{ tir_pct:13.8, duracion_anios:2.6, vencimiento:"2027-05-01", cupon_pct:5.25, ley:"Argentina", paridad_pct:74.2, calificacion_crediticia:"CCC-", amortizacion:"Bullet", proximo_pago_cupon:"2025-05-01", proximo_pago_monto_usd:26.25}, noticias:"Provincia refinanció parte de su deuda en 2024. Coparticipación como garantía reduce riesgo relativo."},
  { id:"YPF-ON-2027", instrumento:"on", general:{ nombre:"YPF ON Serie XLIII 2027", ticker:"YPFAO", sector:"Energía / Petróleo", logo_emoji:"🏢", descripcion:"Obligación negociable hard dollar de YPF garantizada con flujos de exportación.", empresa_emisora:"YPF S.A.", ceo:"Horacio Marín", directivos:[{cargo:"CEO",nombre:"Horacio Marín"},{cargo:"CFO",nombre:"Federico Barroetaveña"}]}, precio:{ valor:98.50, moneda:"USD", variacion_diaria_pct:0.2, variacion_ytd_pct:5.1, semana_52:{min:88,max:102}, volumen_operado_ars:95000000}, on_info:{ tir_pct:8.5, duracion_anios:2.1, vencimiento:"2027-03-15", cupon_pct:8.5, ley:"Argentina", calificacion_crediticia:"B-", garantia:"Exportaciones de petróleo", proximo_pago_cupon:"2025-03-15", proximo_pago_monto_usd:4.25}, noticias:"Muy demandada por garantía exportadora y rendimiento en dólares."},
  { id:"PAMPA-ON-2027", instrumento:"on", general:{ nombre:"Pampa Energía ON USD 2027", ticker:"PAMPAR", sector:"Energía", logo_emoji:"🏢", descripcion:"Obligación Negociable en dólares de Pampa Energía. Una de las ONs corporativas más líquidas del mercado.", empresa_emisora:"Pampa Energía S.A.", ceo:"Gustavo Mariani", directivos:[{cargo:"CEO",nombre:"Gustavo Mariani"}]}, precio:{ valor:102.40, moneda:"USD", variacion_diaria_pct:0.2, variacion_ytd_pct:6.8, semana_52:{min:92,max:106}, volumen_operado_ars:68000000}, on_info:{ tir_pct:7.2, duracion_anios:2.8, vencimiento:"2027-09-22", cupon_pct:7.5, ley:"Nueva York", calificacion_crediticia:"B", garantia:"Quirografaria", proximo_pago_cupon:"2025-09-22", proximo_pago_monto_usd:3.75}, noticias:"Cotiza sobre la par por sólida posición financiera."},
  { id:"TELECOM-ON-2026", instrumento:"on", general:{ nombre:"Telecom Argentina ON USD 2026", ticker:"TLCMO", sector:"Telecomunicaciones", logo_emoji:"🏢", descripcion:"ON en dólares de la mayor empresa de telecomunicaciones de Argentina.", empresa_emisora:"Telecom Argentina S.A.", ceo:"Carlos Moltini", directivos:[{cargo:"CEO",nombre:"Carlos Moltini"},{cargo:"CFO",nombre:"Gabriel Blasi"}]}, precio:{ valor:97.80, moneda:"USD", variacion_diaria_pct:0.2, variacion_ytd_pct:4.9, semana_52:{min:88,max:102}, volumen_operado_ars:42000000}, on_info:{ tir_pct:9.1, duracion_anios:1.3, vencimiento:"2026-03-17", cupon_pct:8.5, ley:"Nueva York", calificacion_crediticia:"B-", garantia:"Quirografaria", proximo_pago_cupon:"2025-03-17", proximo_pago_monto_usd:4.25}, noticias:"La empresa mejoró su flujo de caja por ajuste tarifario."},
  { id:"ARCOR-ON-2027", instrumento:"on", general:{ nombre:"Arcor ON USD 2027", ticker:"ARCABO", sector:"Consumo / Alimentos", logo_emoji:"🏢", descripcion:"Obligación Negociable de Arcor, líder en alimentos y confitería de Latinoamérica.", empresa_emisora:"Arcor S.A.I.C.", ceo:"Daniel Funes de Rioja", directivos:[{cargo:"Presidente y CEO",nombre:"Daniel Funes de Rioja"},{cargo:"CFO",nombre:"Pablo Campana"}]}, precio:{ valor:99.20, moneda:"USD", variacion_diaria_pct:0.1, variacion_ytd_pct:3.8, semana_52:{min:90,max:104}, volumen_operado_ars:31000000}, on_info:{ tir_pct:7.8, duracion_anios:2.2, vencimiento:"2027-01-22", cupon_pct:6.0, ley:"Nueva York", calificacion_crediticia:"B", garantia:"Quirografaria", proximo_pago_cupon:"2025-07-22", proximo_pago_monto_usd:3.00}, noticias:"Perfil exportador da solidez al crédito."},
  { id:"GENNEIA-ON-2027", instrumento:"on", general:{ nombre:"Genneia ON USD 2027", ticker:"GNCXO", sector:"Energías Renovables", logo_emoji:"🌿", descripcion:"ON de Genneia, mayor empresa de generación de energía renovable de Argentina.", empresa_emisora:"Genneia S.A.", ceo:"Juan Bosch", directivos:[{cargo:"CEO",nombre:"Juan Bosch"},{cargo:"CFO",nombre:"Analía Colombo"}]}, precio:{ valor:90.10, moneda:"USD", variacion_diaria_pct:0.6, variacion_ytd_pct:7.2, semana_52:{min:80,max:98}, volumen_operado_ars:28000000}, on_info:{ tir_pct:11.9, duracion_anios:2.7, vencimiento:"2027-09-12", cupon_pct:8.75, ley:"Nueva York", calificacion_crediticia:"B-", garantia:"Contratos PPA con CAMMESA", proximo_pago_cupon:"2025-09-12", proximo_pago_monto_usd:4.38}, noticias:"La transición energética global respalda el perfil."},
  { id:"IRSA-ON-2028", instrumento:"on", general:{ nombre:"IRSA Propiedades Comerciales ON USD 2028", ticker:"IRCFO", sector:"Real Estate", logo_emoji:"🏢", descripcion:"ON en dólares de la principal operadora de shoppings y real estate comercial de Argentina.", empresa_emisora:"IRSA Propiedades Comerciales S.A.", ceo:"Alejandro Elsztain", directivos:[{cargo:"CEO",nombre:"Alejandro Elsztain"},{cargo:"Presidente",nombre:"Eduardo Elsztain"}]}, precio:{ valor:94.20, moneda:"USD", variacion_diaria_pct:-0.1, variacion_ytd_pct:6.1, semana_52:{min:84,max:100}, volumen_operado_ars:22000000}, on_info:{ tir_pct:9.8, duracion_anios:3.2, vencimiento:"2028-03-15", cupon_pct:8.75, ley:"Nueva York", calificacion_crediticia:"B-", garantia:"Quirografaria", proximo_pago_cupon:"2025-09-15", proximo_pago_monto_usd:4.38}, noticias:"Los shopping centers recuperaron tráfico y facturación."},
  { id:"S31E5", instrumento:"letra", general:{ nombre:"LECAP Enero 2025", ticker:"S31E5", sector:"Deuda Soberana", logo_emoji:"🏛️", descripcion:"Letra Capitalizable del Tesoro Nacional en pesos a tasa fija.", emisor:"Ministerio de Economía"}, precio:{ valor:98.20, moneda:"ARS", variacion_diaria_pct:0.1, variacion_ytd_pct:8.4, semana_52:{min:90,max:100}, volumen_operado_ars:320000000}, letra_info:{ vencimiento:"2025-01-31", dias_al_vencimiento:19, tipo_ajuste:"Tasa fija", tna_pct:33.0, tea_pct:38.5, benchmark:{ tipo:"Tasa BCRA", valor_pct:32.0, spread_vs_benchmark_pct:1.0}}, noticias:null},
  { id:"S23Y5", instrumento:"letra", general:{ nombre:"LECAP Mayo 2025", ticker:"S23Y5", sector:"Deuda Soberana", logo_emoji:"🏛️", descripcion:"Letra Capitalizable del Tesoro en pesos a tasa fija con vencimiento en mayo 2025.", emisor:"Ministerio de Economía"}, precio:{ valor:1124, moneda:"ARS", variacion_diaria_pct:0.08, variacion_ytd_pct:11.2, semana_52:{min:900,max:1200}, volumen_operado_ars:480000000}, letra_info:{ vencimiento:"2025-05-23", dias_al_vencimiento:72, tipo_ajuste:"Tasa fija", tna_pct:34.0, tea_pct:39.8, benchmark:{ tipo:"Tasa BCRA", valor_pct:32.0, spread_vs_benchmark_pct:2.0}}, noticias:"Las LECAPs se posicionaron como referencia de tasa fija en pesos."},
  { id:"TZXM5", instrumento:"letra", general:{ nombre:"LECER Marzo 2025", ticker:"TZXM5", sector:"Deuda Soberana", logo_emoji:"🏛️", descripcion:"Letra del Tesoro ajustada por CER (inflación) con vencimiento en marzo 2025.", emisor:"Ministerio de Economía"}, precio:{ valor:97.80, moneda:"ARS", variacion_diaria_pct:0.2, variacion_ytd_pct:11.2, semana_52:{min:85,max:100}, volumen_operado_ars:180000000}, letra_info:{ vencimiento:"2025-03-21", dias_al_vencimiento:9, tipo_ajuste:"CER (inflación)", tir_real_pct:2.1, benchmark:{ tipo:"Inflación mensual", valor_pct:2.4, spread_vs_benchmark_pct:-0.3}}, noticias:null},
  { id:"X18L5", instrumento:"letra", general:{ nombre:"LECER Julio 2025", ticker:"X18L5", sector:"Deuda Soberana", logo_emoji:"🏛️", descripcion:"Letra del Tesoro ajustada por CER con vencimiento en julio 2025.", emisor:"Ministerio de Economía"}, precio:{ valor:1210, moneda:"ARS", variacion_diaria_pct:0.12, variacion_ytd_pct:14.8, semana_52:{min:980,max:1280}, volumen_operado_ars:390000000}, letra_info:{ vencimiento:"2025-07-18", dias_al_vencimiento:128, tipo_ajuste:"CER (inflación)", tir_real_pct:3.2, benchmark:{ tipo:"Inflación mensual", valor_pct:2.4, spread_vs_benchmark_pct:0.8}}, noticias:"Alta demanda de instrumentos CER ante incertidumbre inflacionaria."},
  { id:"S27J5", instrumento:"letra", general:{ nombre:"LEDE Junio 2025", ticker:"S27J5", sector:"Deuda Soberana", logo_emoji:"🏛️", descripcion:"Letra del Tesoro en dólares con descuento y vencimiento en junio 2025.", emisor:"Ministerio de Economía"}, precio:{ valor:98.40, moneda:"USD", variacion_diaria_pct:0.05, variacion_ytd_pct:3.2, semana_52:{min:93,max:100}, volumen_operado_ars:210000000}, letra_info:{ vencimiento:"2025-06-27", dias_al_vencimiento:107, tipo_ajuste:"Tasa fija USD", tna_pct:5.8, tea_pct:5.9, benchmark:{ tipo:"Fed Funds Rate", valor_pct:5.25, spread_vs_benchmark_pct:0.55}}, noticias:"Alta demanda en la última licitación."},
  { id:"T17O5", instrumento:"letra", general:{ nombre:"Letra Dólar Linked Octubre 2025", ticker:"T17O5", sector:"Deuda Soberana", logo_emoji:"🏛️", descripcion:"Letra del Tesoro en pesos que ajusta por tipo de cambio oficial. Cobertura cambiaria sin divisas.", emisor:"Ministerio de Economía"}, precio:{ valor:1320, moneda:"ARS", variacion_diaria_pct:0.15, variacion_ytd_pct:18.3, semana_52:{min:1050,max:1380}, volumen_operado_ars:185000000}, letra_info:{ vencimiento:"2025-10-17", dias_al_vencimiento:219, tipo_ajuste:"Dólar linked", benchmark:{ tipo:"Tipo de cambio oficial", valor_pct:null, spread_vs_benchmark_pct:null}}, noticias:"Demanda de cobertura cambiaria creció ante expectativas de unificación del tipo de cambio."}
];

const TIPOS = [
  { id:"todos", label:"Todos" },
  { id:"accion", label:"Acciones" },
  { id:"cedear", label:"CEDEARs" },
  { id:"bono_soberano", label:"Bonos" },
  { id:"on", label:"ONs" },
  { id:"letra", label:"Letras" },
];

const SECTORES = [...new Set(ACTIVOS.map(a => a.general.sector))].sort();

const TIPO_LABELS = { accion:"Acción", cedear:"CEDEAR", bono_soberano:"Bono Soberano", on:"Obligación Negociable", letra:"Letra del Tesoro" };

function fmtARS(n) { return new Intl.NumberFormat("es-AR", { minimumFractionDigits:0, maximumFractionDigits:0 }).format(n); }
function fmtUSD(n, dec=2) { return "U$D " + new Intl.NumberFormat("es-AR", { minimumFractionDigits:dec, maximumFractionDigits:dec }).format(n); }
function fmtPct(n) { return (n >= 0 ? "+" : "") + Number(n).toFixed(1) + "%"; }
function fmtDate(s) { if (!s) return "—"; const [y,m,d] = s.split("-"); const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"]; return `${parseInt(d)} ${meses[parseInt(m)-1]} ${y}`; }

function creditBadge(cc) {
  if (!cc || cc === "N/A") return { bg:"#F1EFE8", color:"#5F5E5A", label:"N/A" };
  const up = cc.toUpperCase();
  if (up.startsWith("A")) return { bg:"#EAF3DE", color:"#3B6D11", label:cc };
  if (up.startsWith("B")) return { bg:"#FAEEDA", color:"#854F0B", label:cc };
  return { bg:"#FCEBEB", color:"#A32D2D", label:cc };
}

function LogoImg({ ticker, emoji, size=44 }) {
  const [err, setErr] = useState(false);
  const url = ASSET_LOGOS[ticker];
  if (!url || err) {
    return (
      <div style={{ width:size, height:size, borderRadius:12, background:C.light, display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.5, flexShrink:0 }}>
        {emoji}
      </div>
    );
  }
  return (
    <img src={url} alt={ticker} onError={() => setErr(true)}
         style={{ width:size, height:size, borderRadius:12, objectFit:"cover", flexShrink:0, border:`1px solid ${C.light}` }} />
  );
}

function Divider() {
  return <div style={{ height:"1px", background:C.light, margin:"0 0" }} />;
}

function Row({ label, children, sub }) {
  return (
    <div style={{ padding:"14px 0", fontFamily:font }}>
      <div style={{ fontSize:11, fontWeight:800, color:"#6B8EC8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:14, color:C.navy, fontWeight:600 }}>{children}</div>
      {sub && <div style={{ fontSize:12, color:"#6B8EC8", marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function Termometro({ min, max, actual }) {
  const pct = Math.min(100, Math.max(0, ((actual - min) / (max - min)) * 100));
  return (
    <div style={{ marginTop:6 }}>
      <div style={{ position:"relative", height:8, borderRadius:99, background:`linear-gradient(to right, #E24B4A, #EF9F27, #639922)`, margin:"8px 0 6px" }}>
        <div style={{ position:"absolute", top:"50%", transform:"translateY(-50%)", left:`calc(${pct}% - 8px)`, width:16, height:16, background:"#fff", border:`2.5px solid ${C.blue}`, borderRadius:"50%", boxShadow:"0 2px 6px rgba(0,98,222,0.3)" }} />
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6B8EC8", fontFamily:font }}>
        <span>{actual <= min+((max-min)*0.1) ? <b style={{color:"#E24B4A"}}>▼ Mínimo histórico</b> : `Mín ${actual.toLocaleString("es-AR",{minimumFractionDigits:2})}`}</span>
        <span>Actual: <b style={{color:C.dark}}>{actual.toLocaleString("es-AR",{minimumFractionDigits:2})}</b></span>
        <span>Máx {max.toLocaleString("es-AR",{minimumFractionDigits:2})}</span>
      </div>
    </div>
  );
}

function SmallCard({ label, value, sub }) {
  return (
    <div style={{ background:C.light, borderRadius:12, padding:"12px 10px", flex:1, minWidth:0, fontFamily:font }}>
      <div style={{ fontSize:10, fontWeight:800, color:"#6B8EC8", textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{label}</div>
      <div style={{ fontSize:18, fontWeight:800, color:C.navy }}>{value != null ? value : <span style={{fontSize:12,color:"#A8C4E8"}}>N/D</span>}</div>
      {sub && <div style={{ fontSize:11, color:"#4A6E9A", marginTop:2, lineHeight:1.35 }}>{sub}</div>}
    </div>
  );
}

function VolBar({ actual, media, pct }) {
  const isUp = pct >= 0;
  const barW = Math.min(100, Math.abs(pct));
  return (
    <div style={{ fontFamily:font }}>
      <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:6 }}>
        <span style={{ fontSize:16, fontWeight:800, color:C.dark }}>ARS {fmtARS(actual)}</span>
        <span style={{ fontSize:12, fontWeight:700, color: isUp ? "#3B6D11" : "#A32D2D" }}>{isUp ? "▲" : "▼"} {Math.abs(pct).toFixed(1)}% vs promedio 30d</span>
      </div>
      <div style={{ height:6, background:C.light, borderRadius:99, overflow:"hidden" }}>
        <div style={{ height:6, width:`${barW}%`, background: isUp ? "#639922" : "#E24B4A", borderRadius:99 }} />
      </div>
      <div style={{ fontSize:11, color:"#6B8EC8", marginTop:4 }}>Promedio 30 días: ARS {fmtARS(media)}</div>
    </div>
  );
}

function Tarjeta({ activo, onRemove }) {
  const { id, instrumento, general, precio, fundamentals, bono_info, on_info, letra_info, cedear_info, noticias } = activo;
  const ticker = general.ticker;
  const sube = precio.variacion_diaria_pct >= 0;
  const subeYTD = precio.variacion_ytd_pct >= 0;

  const priceDisplay = precio.moneda === "ARS"
    ? `ARS ${fmtARS(precio.valor)}`
    : `U$D ${precio.valor.toLocaleString("es-AR", { minimumFractionDigits:2 })}`;

  const bonoData = bono_info || on_info;

  return (
    <div style={{ background:"#fff", borderRadius:20, border:`1px solid ${C.light}`, overflow:"hidden", fontFamily:font, display:"flex", flexDirection:"column" }}>

      {/* HEADER */}
      <div style={{ background:C.dark, padding:"18px 18px 16px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <LogoImg ticker={ticker} emoji={general.logo_emoji} size={46} />
            <div>
              <div style={{ fontWeight:800, color:"#fff", fontSize:15, lineHeight:1.2 }}>{general.nombre}</div>
              <div style={{ fontSize:12, color:"#A8C4E8", marginTop:3 }}>
                <span style={{ background:"rgba(255,255,255,0.12)", borderRadius:6, padding:"2px 8px", marginRight:6 }}>{ticker}</span>
                <span>{general.sector}</span>
              </div>
            </div>
          </div>
          <button onClick={() => onRemove(id)} style={{ background:"rgba(255,255,255,0.12)", border:"none", borderRadius:"50%", width:28, height:28, cursor:"pointer", color:"#A8C4E8", fontSize:13, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✕</button>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:11, color:"#6B8EC8", marginBottom:3, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em" }}>Precio actual</div>
            <div style={{ fontSize:22, fontWeight:900, color:"#fff" }}>{priceDisplay}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:11, color:"#6B8EC8", marginBottom:3, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em" }}>Hoy</div>
            <div style={{ fontSize:16, fontWeight:800, color: sube ? "#9FE1CB" : "#F09595" }}>{sube ? "▲" : "▼"} {Math.abs(precio.variacion_diaria_pct).toFixed(1)}%</div>
          </div>
        </div>
        <div style={{ marginTop:8 }}>
          <span style={{ display:"inline-block", fontSize:12, fontWeight:800, padding:"4px 12px", borderRadius:99, background: subeYTD ? "rgba(100,215,168,0.18)" : "rgba(240,149,149,0.18)", color: subeYTD ? "#9FE1CB" : "#F09595", border:`1px solid ${subeYTD ? "rgba(100,215,168,0.3)" : "rgba(240,149,149,0.3)"}` }}>
            {TIPO_LABELS[instrumento]} · {subeYTD ? "+" : ""}{precio.variacion_ytd_pct.toFixed(1)}% en el año
          </span>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding:"0 18px", flex:1 }}>

        {/* Termometro 52s */}
        {precio.semana_52 && (
          <>
            <Row label="Precio en las últimas 52 semanas">
              <Termometro min={precio.semana_52.min} max={precio.semana_52.max} actual={precio.valor} />
            </Row>
            <Divider />
          </>
        )}

        {/* Directivos */}
        <Row label="Equipo directivo">
          <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
            {(general.directivos || []).map((d,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"baseline" }}>
                <span style={{ fontSize:11, color:"#6B8EC8", minWidth:100 }}>{d.cargo}</span>
                <span style={{ fontSize:13, fontWeight:700, color:C.dark }}>{d.nombre}</span>
              </div>
            ))}
            {!general.directivos && general.ceo && (
              <span style={{ fontSize:13, fontWeight:700, color:C.dark }}>{general.ceo}</span>
            )}
            {!general.directivos && general.emisor && (
              <span style={{ fontSize:13, fontWeight:700, color:C.dark }}>{general.emisor}</span>
            )}
          </div>
        </Row>
        <Divider />

        {/* Descripcion */}
        <Row label="Sobre este activo">
          <span style={{ color:"#4A6E9A", fontWeight:400, lineHeight:1.65, fontSize:13 }}>{general.descripcion}</span>
        </Row>
        <Divider />

        {/* Volumen */}
        {precio.volumen_operado_ars && precio.volumen_media_30d_ars && (
          <>
            <Row label="Volumen operado">
              <VolBar actual={precio.volumen_operado_ars} media={precio.volumen_media_30d_ars} pct={precio.volumen_vs_media_pct} />
            </Row>
            <Divider />
          </>
        )}

        {/* === ACCIONES & CEDEARs === */}
        {(instrumento === "accion" || instrumento === "cedear") && fundamentals && (
          <>
            <Row label="Capitalización bursátil">
              <span style={{ fontWeight:800, color:C.dark }}>
                {fundamentals.market_cap_usd_mm >= 1000
                  ? `U$D ${(fundamentals.market_cap_usd_mm/1000).toFixed(1)} billones`
                  : `U$D ${fmtARS(fundamentals.market_cap_usd_mm)} millones`}
              </span>
            </Row>
            <Divider />

            <Row label="Resultado neto" sub={fundamentals.earnings_periodo}>
              <span style={{ fontWeight:800, color: fundamentals.earnings_usd_mm >= 0 ? "#3B6D11" : "#A32D2D" }}>
                {fundamentals.earnings_usd_mm >= 0 ? "Ganancia" : "Pérdida"} U$D {fmtARS(Math.abs(fundamentals.earnings_usd_mm))} millones
              </span>
            </Row>
            <Divider />

            {fundamentals.dividend_yield_pct > 0 && (
              <>
                <Row label="Dividendo">
                  <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                    <div>
                      <div style={{ fontSize:11, color:"#6B8EC8" }}>Rendimiento anual</div>
                      <div style={{ fontSize:18, fontWeight:800, color:C.dark }}>{fundamentals.dividend_yield_pct.toFixed(1)}%</div>
                    </div>
                    {fundamentals.dividendo_proximo_pago && (
                      <div>
                        <div style={{ fontSize:11, color:"#6B8EC8" }}>Próximo pago</div>
                        <div style={{ fontSize:14, fontWeight:700, color:C.dark }}>{fmtDate(fundamentals.dividendo_proximo_pago)}</div>
                      </div>
                    )}
                  </div>
                </Row>
                <Divider />
              </>
            )}

            {instrumento === "cedear" && cedear_info && (
              <>
                <Row label="Ratio CEDEAR" sub={`Bolsa origen: ${cedear_info.bolsa_origen}`}>
                  <span style={{ fontWeight:800, color:C.dark }}>1 CEDEAR = {cedear_info.ratio_cedear} acción{cedear_info.ratio_cedear > 1 ? "es" : ""} en {cedear_info.bolsa_origen}</span>
                </Row>
                <Divider />
                {precio.subyacente_usd && (
                  <>
                    <Row label="Precio en bolsa de origen">
                      <span style={{ fontWeight:800, color:C.dark }}>{fmtUSD(precio.subyacente_usd)} en {cedear_info.bolsa_origen}</span>
                    </Row>
                    <Divider />
                  </>
                )}
              </>
            )}

            <div style={{ padding:"14px 0" }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#6B8EC8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Indicadores clave</div>
              <div style={{ display:"flex", gap:8 }}>
                <SmallCard label="P/E" value={fundamentals.pe ? `${fundamentals.pe}x` : null} sub={fundamentals.pe ? `Paga ${fundamentals.pe}x por cada U$D 1 ganado` : "Sin ganancias"} />
                <SmallCard label="P/B" value={`${fundamentals.pb}x`} sub={fundamentals.pb <= 1 ? "Bajo valor libro" : `${fundamentals.pb}x valor libros`} />
                <SmallCard label="ROE" value={fundamentals.roe_pct !== null ? `${fundamentals.roe_pct}%` : null} sub={fundamentals.roe_pct > 0 ? `U$D ${fundamentals.roe_pct} c/U$D 100` : "Capital negativo"} />
              </div>
            </div>
            <Divider />
          </>
        )}

        {/* === BONOS SOBERANOS & ONs === */}
        {(instrumento === "bono_soberano" || instrumento === "on") && bonoData && (
          <>
            <div style={{ padding:"14px 0" }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#6B8EC8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Métricas del bono</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <SmallCard label="TIR" value={`${bonoData.tir_pct}%`} sub="Rendimiento al vencimiento" />
                <SmallCard label="Cupón" value={`${bonoData.cupon_pct}%`} sub="Tasa de interés anual" />
                <SmallCard label="Duración" value={`${bonoData.duracion_anios}a`} sub="Sensibilidad a tasas" />
                {bonoData.paridad_pct && <SmallCard label="Paridad" value={`${bonoData.paridad_pct}%`} sub="Precio sobre nominal" />}
              </div>
            </div>
            <Divider />

            {bonoData.calificacion_crediticia && (
              <>
                <Row label="Clasificación crediticia">
                  {(() => { const b = creditBadge(bonoData.calificacion_crediticia); return (
                    <span style={{ display:"inline-block", background:b.bg, color:b.color, fontWeight:800, fontSize:15, padding:"4px 14px", borderRadius:8 }}>{b.label}</span>
                  ); })()}
                </Row>
                <Divider />
              </>
            )}

            <Row label="Vencimiento"><span style={{ fontWeight:800, color:C.dark }}>{fmtDate(bonoData.vencimiento)}</span></Row>
            <Divider />
            <Row label="Ley aplicable"><span style={{ fontWeight:700 }}>{bonoData.ley}</span></Row>
            <Divider />
            <Row label="Amortización"><span style={{ fontWeight:700 }}>{bonoData.amortizacion}</span></Row>
            <Divider />
            {bonoData.proximo_pago_cupon && (
              <>
                <Row label="Próximo pago de cupón" sub={bonoData.proximo_pago_monto_usd ? `U$D ${bonoData.proximo_pago_monto_usd} por lámina de U$D 100` : undefined}>
                  <span style={{ fontWeight:800, color:C.dark }}>{fmtDate(bonoData.proximo_pago_cupon)}</span>
                </Row>
                <Divider />
              </>
            )}
            {instrumento === "on" && on_info?.garantia && (
              <>
                <Row label="Garantía"><span style={{ fontWeight:700 }}>{on_info.garantia}</span></Row>
                <Divider />
              </>
            )}
          </>
        )}

        {/* === LETRAS === */}
        {instrumento === "letra" && letra_info && (
          <>
            <Row label="Vencimiento" sub={`${letra_info.dias_al_vencimiento} días al vencimiento`}>
              <span style={{ fontWeight:800, color:C.dark }}>{fmtDate(letra_info.vencimiento)}</span>
            </Row>
            <Divider />

            <Row label="Tipo de ajuste">
              <span style={{ background:C.light, color:C.blue, fontWeight:800, padding:"3px 12px", borderRadius:8, fontSize:13 }}>{letra_info.tipo_ajuste}</span>
            </Row>
            <Divider />

            <div style={{ padding:"14px 0" }}>
              <div style={{ fontSize:11, fontWeight:800, color:"#6B8EC8", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Rendimientos</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {letra_info.tna_pct && <SmallCard label="TNA" value={`${letra_info.tna_pct}%`} sub="Tasa nominal anual" />}
                {letra_info.tea_pct && <SmallCard label="TEA" value={`${letra_info.tea_pct}%`} sub="Tasa efectiva anual" />}
                {letra_info.tir_real_pct && <SmallCard label="TIR Real" value={`${letra_info.tir_real_pct}%`} sub="Sobre inflación" />}
              </div>
            </div>
            <Divider />

            {letra_info.benchmark && (
              <>
                <Row label={`Comparado con ${letra_info.benchmark.tipo}`}>
                  <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                    {letra_info.benchmark.valor_pct != null && (
                      <div>
                        <div style={{ fontSize:11, color:"#6B8EC8" }}>{letra_info.benchmark.tipo}</div>
                        <div style={{ fontSize:16, fontWeight:800 }}>{letra_info.benchmark.valor_pct}%</div>
                      </div>
                    )}
                    {letra_info.benchmark.spread_vs_benchmark_pct != null && (
                      <div>
                        <div style={{ fontSize:11, color:"#6B8EC8" }}>Spread</div>
                        <div style={{ fontSize:16, fontWeight:800, color: letra_info.benchmark.spread_vs_benchmark_pct >= 0 ? "#3B6D11" : "#A32D2D" }}>
                          {letra_info.benchmark.spread_vs_benchmark_pct >= 0 ? "+" : ""}{letra_info.benchmark.spread_vs_benchmark_pct}%
                        </div>
                      </div>
                    )}
                  </div>
                </Row>
                <Divider />
              </>
            )}

            <Row label="Emisor">
              <span style={{ fontWeight:700 }}>{general.emisor}</span>
            </Row>
            <Divider />
          </>
        )}

        {/* NOTICIAS */}
        {noticias && (
          <>
            <Row label="Últimas novedades">
              <span style={{ color:"#4A6E9A", fontWeight:400, lineHeight:1.65, fontSize:13 }}>{noticias}</span>
            </Row>
          </>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding:"14px 18px 18px" }}>
        <a href="https://www.cocos.capital/" target="_blank" rel="noreferrer"
           style={{ display:"block", textAlign:"center", background:C.blue, color:"#fff", borderRadius:12, padding:"13px 0", textDecoration:"none", fontWeight:800, fontSize:14, fontFamily:font, letterSpacing:"0.01em" }}>
          Operar {ticker} en Cocos →
        </a>
        <div style={{ fontSize:10, color:"#A8C4E8", textAlign:"center", marginTop:8, lineHeight:1.5 }}>
          Datos ilustrativos · No constituye asesoramiento financiero
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [seleccionados, setSeleccionados] = useState(["GGAL", "MELI-CEDEAR", "GD30"]);
  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [sectorFiltro, setSectorFiltro] = useState("");

  const activosFiltrados = useMemo(() => ACTIVOS.filter(a => {
    if (tipoFiltro !== "todos" && a.instrumento !== tipoFiltro) return false;
    if (sectorFiltro && a.general.sector !== sectorFiltro) return false;
    if (busqueda) {
      const q = busqueda.toLowerCase();
      return a.general.ticker.toLowerCase().includes(q) || a.general.nombre.toLowerCase().includes(q);
    }
    return true;
  }), [tipoFiltro, sectorFiltro, busqueda]);

  const agregar = (id) => {
    if (!seleccionados.includes(id) && seleccionados.length < 3) {
      setSeleccionados([...seleccionados, id]);
      setBusqueda("");
    }
  };
  const quitar = (id) => setSeleccionados(seleccionados.filter(x => x !== id));

  const disponiblesParaAgregar = activosFiltrados.filter(a => !seleccionados.includes(a.id));
  const activosSeleccionados = seleccionados.map(id => ACTIVOS.find(a => a.id === id)).filter(Boolean);

  const cols = activosSeleccionados.length === 1 ? "minmax(0,460px)" : activosSeleccionados.length === 2 ? "repeat(2,minmax(0,1fr))" : "repeat(3,minmax(0,1fr))";

  return (
    <div style={{ minHeight:"100vh", background:"#EEF6FF", fontFamily:font }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

      {/* APP HEADER */}
      <div style={{ background:C.dark, padding:"24px 20px 20px", borderBottom:`3px solid ${C.blue}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
            <span style={{ fontSize:24, fontWeight:900, color:"#fff" }}>Comparador</span>
            <span style={{ fontSize:24, fontWeight:900, color:C.blue }}>de Activos</span>
          </div>
          <p style={{ color:"#6B8EC8", fontSize:13, margin:0 }}>Información clara sobre instrumentos que cotizan en el mercado argentino</p>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 16px" }}>

        {/* FILTROS */}
        <div style={{ background:"#fff", borderRadius:16, border:`1px solid ${C.light}`, padding:"18px", marginBottom:24 }}>

          {/* Tipo de instrumento */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:14 }}>
            {TIPOS.map(t => (
              <button key={t.id} onClick={() => setTipoFiltro(t.id)}
                      style={{ fontSize:13, fontWeight:700, padding:"7px 16px", borderRadius:99, cursor:"pointer", fontFamily:font, border:`1.5px solid ${tipoFiltro === t.id ? C.blue : C.light}`, background: tipoFiltro === t.id ? C.blue : "#fff", color: tipoFiltro === t.id ? "#fff" : C.navy }}>
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {/* Buscador */}
            <div style={{ position:"relative", flex:"1", minWidth:200 }}>
              <input
                style={{ width:"100%", border:`1.5px solid ${C.light}`, borderRadius:12, padding:"11px 14px", fontSize:14, fontFamily:font, color:C.dark, outline:"none", boxSizing:"border-box", background: seleccionados.length >= 3 ? "#f5f7fa" : "#fff" }}
                placeholder="🔍 Buscá por ticker o nombre..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                disabled={seleccionados.length >= 3}
              />
              {busqueda && disponiblesParaAgregar.length > 0 && (
                <div style={{ position:"absolute", zIndex:20, width:"100%", marginTop:4, background:"#fff", border:`1.5px solid ${C.light}`, borderRadius:14, boxShadow:"0 8px 32px rgba(0,44,101,0.12)", overflow:"hidden", maxHeight:280, overflowY:"auto" }}>
                  {disponiblesParaAgregar.map(a => (
                    <button key={a.id} onClick={() => agregar(a.id)}
                            style={{ width:"100%", textAlign:"left", padding:"10px 14px", display:"flex", alignItems:"center", gap:10, background:"none", border:"none", borderBottom:`1px solid ${C.light}`, cursor:"pointer", fontFamily:font }}>
                      <LogoImg ticker={a.general.ticker} emoji={a.general.logo_emoji} size={32} />
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:C.dark }}>{a.general.ticker} · {a.general.nombre}</div>
                        <div style={{ fontSize:11, color:"#6B8EC8" }}>{TIPO_LABELS[a.instrumento]} · {a.general.sector}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sector */}
            <select value={sectorFiltro} onChange={e => setSectorFiltro(e.target.value)}
                    style={{ border:`1.5px solid ${C.light}`, borderRadius:12, padding:"11px 14px", fontSize:13, fontFamily:font, color: sectorFiltro ? C.dark : "#6B8EC8", fontWeight:600, outline:"none", background:"#fff", minWidth:180, cursor:"pointer" }}>
              <option value="">Todos los sectores</option>
              {SECTORES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Pills disponibles */}
          {seleccionados.length < 3 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:12 }}>
              {disponiblesParaAgregar.slice(0, 12).map(a => (
                <button key={a.id} onClick={() => agregar(a.id)}
                        style={{ fontSize:12, background:"#fff", border:`1.5px solid ${C.light}`, borderRadius:99, padding:"6px 14px", cursor:"pointer", color:C.navy, fontWeight:700, fontFamily:font, display:"flex", alignItems:"center", gap:6 }}>
                  <LogoImg ticker={a.general.ticker} emoji={a.general.logo_emoji} size={18} />
                  {a.general.ticker}
                </button>
              ))}
              {disponiblesParaAgregar.length > 12 && (
                <span style={{ fontSize:12, color:"#6B8EC8", padding:"6px 0" }}>+{disponiblesParaAgregar.length - 12} más</span>
              )}
            </div>
          )}
          {seleccionados.length >= 3 && (
            <p style={{ fontSize:12, color:"#6B8EC8", margin:"10px 0 0" }}>Máximo 3 activos. Quitá uno para agregar otro.</p>
          )}
        </div>

        {/* TARJETAS */}
        {activosSeleccionados.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"#6B8EC8" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📊</div>
            <p style={{ fontWeight:700, fontSize:16 }}>Seleccioná un activo para ver su información</p>
          </div>
        ) : (
          <div style={{ display:"grid", gap:20, alignItems:"start", gridTemplateColumns:cols }}>
            {activosSeleccionados.map(a => <Tarjeta key={a.id} activo={a} onRemove={quitar} />)}
          </div>
        )}

        <p style={{ textAlign:"center", fontSize:11, color:"#A8C4E8", marginTop:40 }}>
          Demo · Datos ilustrativos · No constituye asesoramiento financiero · Cocos Capital
        </p>
      </div>
    </div>
  );
}