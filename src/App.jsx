import { useState, useMemo, useEffect } from "react";
import { ASSET_LOGOS, ACTIVOS } from "./constants/mockData";

const C = {
  navy: "#002C65",
  blue: "#0062DE",
  light: "#D7ECFE",
  dark: "#001533",
};
const font = "'Plus Jakarta Sans', 'Inter', sans-serif";

const TIPOS = [
  { id: "todos", label: "Todos" },
  { id: "accion", label: "Acciones" },
  { id: "cedear", label: "CEDEARs" },
  { id: "bono_soberano", label: "Bonos" },
  { id: "on", label: "ONs" },
  { id: "letra", label: "Letras" },
];

const TIPO_LABELS = {
  accion: "Acción",
  cedear: "CEDEAR",
  bono_soberano: "Bono Soberano",
  on: "Obligación Negociable",
  letra: "Letra del Tesoro",
};

const SELECCIONADOS_POR_DEFECTO = [];

function obtenerSeleccionadosIniciales() {
  if (typeof window === "undefined") return SELECCIONADOS_POR_DEFECTO;

  const idParam = new URLSearchParams(window.location.search).get("id");
  if (!idParam) return SELECCIONADOS_POR_DEFECTO;

  const activoPorParam = ACTIVOS.find(
    (a) => a.id.toUpperCase() === idParam.trim().toUpperCase(),
  );
  if (!activoPorParam) return SELECCIONADOS_POR_DEFECTO;

  return [activoPorParam.id];
}

function fmtARS(n) {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}
function fmtUSD(n, dec = 2) {
  return (
    "US$ " +
    new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    }).format(n)
  );
}
function fmtDate(s) {
  if (!s) return "—";
  const [y, m, d] = s.split("-");
  const meses = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
}

function abreviarCargo(cargo) {
  const map = {
    CEO: "CEO",
    CFO: "CFO",
    "CEO Regional": "CEOR",
    Presidente: "PRES",
    "Presidente del Directorio": "PDD",
    "Presidente y CEO": "PCEO",
  };

  if (map[cargo]) return map[cargo];
  return String(cargo || "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 4);
}

function creditBadge(cc) {
  if (!cc || cc === "N/A")
    return { bg: "#F1EFE8", color: "#5F5E5A", label: "N/A" };
  const up = cc.toUpperCase();
  if (up.startsWith("A")) return { bg: "#EAF3DE", color: "#3B6D11", label: cc };
  if (up.startsWith("B")) return { bg: "#FAEEDA", color: "#854F0B", label: cc };
  return { bg: "#FCEBEB", color: "#A32D2D", label: cc };
}

function LogoImg({ ticker, emoji, size = 44 }) {
  const [err, setErr] = useState(false);
  const url = ASSET_LOGOS[ticker];
  if (!url || err) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: C.light,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.5,
          flexShrink: 0,
        }}
      >
        {emoji}
      </div>
    );
  }
  return (
    <img
      src={url}
      alt={ticker}
      onError={() => setErr(true)}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        flexShrink: 0,
        border: `1px solid ${C.light}`,
      }}
    />
  );
}

function Divider() {
  return <div style={{ height: "1px", background: C.light, margin: "0 0" }} />;
}

function Row({ label, children, sub }) {
  return (
    <div style={{ padding: "14px 0", fontFamily: font }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 800,
          color: "#6B8EC8",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 14, color: C.navy, fontWeight: 600 }}>
        {children}
      </div>
      {sub && (
        <div style={{ fontSize: 12, color: "#6B8EC8", marginTop: 2 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function Termometro({ min, max, actual, moneda }) {
  const pct = Math.min(100, Math.max(0, ((actual - min) / (max - min)) * 100));
  const prefijoMoneda = moneda === "USD" ? "US$" : "$";
  const fmtPrecio = (n) =>
    `${prefijoMoneda} ${n.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
  return (
    <div style={{ marginTop: 6 }}>
      <div
        style={{
          position: "relative",
          height: 8,
          borderRadius: 99,
          background: `linear-gradient(to right, #E24B4A, #EF9F27, #639922)`,
          margin: "8px 0 6px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: `calc(${pct}% - 8px)`,
            width: 16,
            height: 16,
            background: "#fff",
            border: `2.5px solid ${C.blue}`,
            borderRadius: "50%",
            boxShadow: "0 2px 6px rgba(0,98,222,0.3)",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#6B8EC8",
          fontFamily: font,
        }}
      >
        <span>
          {actual <= min + (max - min) * 0.1 ? (
            <b style={{ color: "#E24B4A" }}>
              ▼ Mínimo histórico ({fmtPrecio(min)})
            </b>
          ) : (
            `Mín ${fmtPrecio(min)}`
          )}
        </span>
        <span>
          Actual: <b style={{ color: C.dark }}>{fmtPrecio(actual)}</b>
        </span>
        <span>Máx {fmtPrecio(max)}</span>
      </div>
    </div>
  );
}

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("/embed/")) return url;

  try {
    const parsed = new URL(url);
    const fromQuery = parsed.searchParams.get("v");
    const fromPath = parsed.pathname.split("/").filter(Boolean).pop();
    const videoId = fromQuery || fromPath;
    if (!videoId) return null;
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  } catch {
    return null;
  }
}

function VideoModal({ videoUrl, onClose }) {
  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  if (!embedUrl) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 21, 51, 0.72)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(920px, 100%)",
          background: "#fff",
          borderRadius: 14,
          border: `1px solid ${C.light}`,
          overflow: "hidden",
          boxShadow: "0 18px 60px rgba(0,0,0,0.28)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 12px",
            borderBottom: `1px solid ${C.light}`,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 800, color: C.dark }}>
            Explicación en video
          </span>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#6B8EC8",
              fontSize: 18,
              lineHeight: 1,
              padding: 2,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ position: "relative", width: "100%", paddingTop: "56.25%" }}>
          <iframe
            src={embedUrl}
            title="Explicación en video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function SmallCard({ label, value, sub, labelVideoUrl, onOpenVideo }) {
  return (
    <div
      style={{
        background: C.light,
        borderRadius: 12,
        padding: "12px 10px",
        flex: 1,
        minWidth: 0,
        fontFamily: font,
      }}
    >
      <div
        style={{
          fontSize: 9,
          fontWeight: 800,
          color: "#6B8EC8",
          letterSpacing: "0.02em",
          lineHeight: 1.2,
          marginBottom: 4,
        }}
      >
        {labelVideoUrl ? (
          <button
            type="button"
            onClick={() => onOpenVideo?.(labelVideoUrl)}
            title="Ver explicación en video"
            style={{
              color: "#2F67B1",
              textDecoration: "underline",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              font: "inherit",
            }}
          >
            <span>{label}</span>
            <span
              style={{
                width: 14,
                height: 14,
                minWidth: 14,
                minHeight: 14,
                flexShrink: 0,
                aspectRatio: "1 / 1",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 900,
                color: "#fff",
                background: "#2F67B1",
                textDecoration: "none",
                lineHeight: "14px",
              }}
            >
              ?
            </span>
          </button>
        ) : (
          label
        )}
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: C.navy }}>
        {value != null ? (
          value
        ) : (
          <span style={{ fontSize: 12, color: "#A8C4E8" }}>N/D</span>
        )}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 9,
            color: "#4A6E9A",
            marginTop: 2,
            lineHeight: 1.35,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function VolBar({ actual, media, pct }) {
  const isUp = pct >= 0;
  const barW = Math.min(100, Math.abs(pct));
  return (
    <div style={{ fontFamily: font }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 800, color: C.dark }}>
          ARS {fmtARS(actual)}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: isUp ? "#3B6D11" : "#A32D2D",
          }}
        >
          {isUp ? "▲" : "▼"} {Math.abs(pct).toFixed(1)}% vs promedio 30d
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: C.light,
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 6,
            width: `${barW}%`,
            background: isUp ? "#639922" : "#E24B4A",
            borderRadius: 99,
          }}
        />
      </div>
      <div style={{ fontSize: 11, color: "#6B8EC8", marginTop: 4 }}>
        Promedio 30 días: ARS {fmtARS(media)}
      </div>
    </div>
  );
}

function Tarjeta({ activo, onRemove, isMobile }) {
  const {
    id,
    instrumento,
    general,
    precio,
    fundamentals,
    bono_info,
    on_info,
    letra_info,
    cedear_info,
    noticias,
  } = activo;
  const ticker = general.ticker;
  const sube = precio.variacion_diaria_pct >= 0;
  const subeYTD = precio.variacion_ytd_pct >= 0;
  const [videoModalUrl, setVideoModalUrl] = useState(null);

  const priceDisplay =
    precio.moneda === "ARS"
      ? `ARS ${fmtARS(precio.valor)}`
      : `US$ ${precio.valor.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

  const bonoData = bono_info || on_info;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 20,
        border: `1px solid ${C.light}`,
        overflow: "hidden",
        fontFamily: font,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div style={{ background: C.dark, padding: "18px 18px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LogoImg ticker={ticker} emoji={general.logo_emoji} size={46} />
            <div>
              <div
                style={{
                  fontWeight: 800,
                  color: "#fff",
                  fontSize: 15,
                  lineHeight: 1.2,
                }}
              >
                {general.nombre}
              </div>
              <div style={{ fontSize: 12, color: "#A8C4E8", marginTop: 3 }}>
                <span
                  style={{
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: 6,
                    padding: "2px 8px",
                    marginRight: 6,
                  }}
                >
                  {ticker}
                </span>
                <span>{general.sector}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => onRemove(id)}
            style={{
              background: "rgba(255,255,255,0.12)",
              border: "none",
              borderRadius: "50%",
              width: 28,
              height: 28,
              cursor: "pointer",
              color: "#A8C4E8",
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#6B8EC8",
                marginBottom: 3,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Precio actual
            </div>
            <div style={{ fontSize: 22, fontWeight: 900, color: "#fff" }}>
              {priceDisplay}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: 11,
                color: "#6B8EC8",
                marginBottom: 3,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Hoy
            </div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: sube ? "#9FE1CB" : "#F09595",
              }}
            >
              {sube ? "▲" : "▼"}{" "}
              {Math.abs(precio.variacion_diaria_pct).toFixed(1)}%
            </div>
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 800,
              padding: "4px 12px",
              borderRadius: 99,
              background: subeYTD
                ? "rgba(100,215,168,0.18)"
                : "rgba(240,149,149,0.18)",
              color: subeYTD ? "#9FE1CB" : "#F09595",
              border: `1px solid ${subeYTD ? "rgba(100,215,168,0.3)" : "rgba(240,149,149,0.3)"}`,
            }}
          >
            {TIPO_LABELS[instrumento]} · {subeYTD ? "+" : ""}
            {precio.variacion_ytd_pct.toFixed(1)}% en el año
          </span>
        </div>
      </div>

      {/* BODY */}
      <div style={{ padding: "0 18px", flex: 1 }}>
        {/* Termometro 52s */}
        {precio.semana_52 && (
          <>
            <Row label="Precio en las últimas 52 semanas">
              <Termometro
                min={precio.semana_52.min}
                max={precio.semana_52.max}
                actual={precio.valor}
                moneda={precio.moneda}
              />
            </Row>
            <Divider />
          </>
        )}

        {/* Directivos */}
        <Row label="Equipo directivo">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {(general.directivos || []).map((d, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 8, alignItems: "baseline" }}
              >
                <span
                  title={d.cargo}
                  style={{
                    fontSize: 11,
                    color: "#004A99",
                    background: "#E6F2FF",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontWeight: 700,
                    lineHeight: 1.2,
                    minWidth: 52,
                    textAlign: "center",
                  }}
                >
                  {abreviarCargo(d.cargo)}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                  {d.nombre}
                </span>
              </div>
            ))}
            {!general.directivos && general.ceo && (
              <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                {general.ceo}
              </span>
            )}
            {!general.directivos && general.emisor && (
              <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
                {general.emisor}
              </span>
            )}
          </div>
        </Row>
        <Divider />

        {/* Descripcion */}
        <Row label="Sobre este activo">
          <span
            style={{
              color: "#4A6E9A",
              fontWeight: 400,
              lineHeight: 1.65,
              fontSize: 13,
            }}
          >
            {general.descripcion}
          </span>
        </Row>
        <Divider />

        {/* Volumen */}
        {precio.volumen_operado_ars && precio.volumen_media_30d_ars && (
          <>
            <Row label="Volumen operado">
              <VolBar
                actual={precio.volumen_operado_ars}
                media={precio.volumen_media_30d_ars}
                pct={precio.volumen_vs_media_pct}
              />
            </Row>
            <Divider />
          </>
        )}

        {/* === ACCIONES & CEDEARs === */}
        {(instrumento === "accion" || instrumento === "cedear") &&
          fundamentals && (
            <>
              <Row label="Capitalización bursátil">
                <span style={{ fontWeight: 800, color: C.dark }}>
                  {fundamentals.market_cap_usd_mm >= 1000
                    ? `US$ ${(fundamentals.market_cap_usd_mm / 1000).toFixed(1)} billones`
                    : `US$ ${fmtARS(fundamentals.market_cap_usd_mm)} millones`}
                </span>
              </Row>
              <Divider />

              <Row label="Resultado neto" sub={fundamentals.earnings_periodo}>
                <span
                  style={{
                    fontWeight: 800,
                    color:
                      fundamentals.earnings_usd_mm >= 0 ? "#3B6D11" : "#A32D2D",
                  }}
                >
                  {fundamentals.earnings_usd_mm >= 0 ? "Ganancia" : "Pérdida"}{" "}
                  US$ {fmtARS(Math.abs(fundamentals.earnings_usd_mm))} millones
                </span>
              </Row>
              <Divider />

              {fundamentals.dividend_yield_pct > 0 && (
                <>
                  <Row label="Dividendo">
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                      <div>
                        <div style={{ fontSize: 11, color: "#6B8EC8" }}>
                          Rendimiento anual
                        </div>
                        <div
                          style={{
                            fontSize: 18,
                            fontWeight: 800,
                            color: C.dark,
                          }}
                        >
                          {fundamentals.dividend_yield_pct.toFixed(1)}%
                        </div>
                      </div>
                      {fundamentals.dividendo_proximo_pago && (
                        <div>
                          <div style={{ fontSize: 11, color: "#6B8EC8" }}>
                            Próximo pago
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: C.dark,
                            }}
                          >
                            {fmtDate(fundamentals.dividendo_proximo_pago)}
                          </div>
                        </div>
                      )}
                    </div>
                  </Row>
                  <Divider />
                </>
              )}

              {instrumento === "cedear" && cedear_info && (
                <>
                  <Row
                    label="Ratio CEDEAR"
                    sub={`Bolsa origen: ${cedear_info.bolsa_origen}`}
                  >
                    <span style={{ fontWeight: 800, color: C.dark }}>
                      1 CEDEAR = {cedear_info.ratio_cedear} acción
                      {cedear_info.ratio_cedear > 1 ? "es" : ""} en{" "}
                      {cedear_info.bolsa_origen}
                    </span>
                  </Row>
                  <Divider />
                  {precio.subyacente_usd && (
                    <>
                      <Row label="Precio en bolsa de origen">
                        <span style={{ fontWeight: 800, color: C.dark }}>
                          {fmtUSD(precio.subyacente_usd)} en{" "}
                          {cedear_info.bolsa_origen}
                        </span>
                      </Row>
                      <Divider />
                    </>
                  )}
                </>
              )}

              <div style={{ padding: "14px 0" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#6B8EC8",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 10,
                  }}
                >
                  Indicadores clave
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: 8,
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  }}
                >
                  <SmallCard
                    label="Precio / Ganancias"
                    labelVideoUrl="https://www.youtube.com/shorts/2p9l9ZC_Hp4"
                    onOpenVideo={setVideoModalUrl}
                    value={fundamentals.pe ? `${fundamentals.pe}x` : null}
                    sub={
                      fundamentals.pe
                        ? `Paga ${fundamentals.pe}x por cada US$ 1 ganado`
                        : "Sin ganancias"
                    }
                  />
                  <SmallCard
                    label="Precio / Valor libro"
                    labelVideoUrl="https://www.youtube.com/shorts/2p9l9ZC_Hp4"
                    onOpenVideo={setVideoModalUrl}
                    value={`${fundamentals.pb}x`}
                    sub={
                      fundamentals.pb <= 1
                        ? "Bajo valor libro"
                        : `${fundamentals.pb}x valor libros`
                    }
                  />
                  <SmallCard
                    label="Rentabilidad sobre patrimonio"
                    labelVideoUrl="https://www.youtube.com/shorts/2p9l9ZC_Hp4"
                    onOpenVideo={setVideoModalUrl}
                    value={
                      fundamentals.roe_pct !== null
                        ? `${fundamentals.roe_pct}%`
                        : null
                    }
                    sub={
                      fundamentals.roe_pct > 0
                        ? `US$ ${fundamentals.roe_pct} c/US$ 100`
                        : "Capital negativo"
                    }
                  />
                </div>
              </div>
              <Divider />
            </>
          )}

        {/* === BONOS SOBERANOS & ONs === */}
        {(instrumento === "bono_soberano" || instrumento === "on") &&
          bonoData && (
            <>
              <div style={{ padding: "14px 0" }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: "#6B8EC8",
                    textTransform: "uppercase",
                    letterSpacing: "0.07em",
                    marginBottom: 10,
                  }}
                >
                  Métricas del bono
                </div>
                <div
                  style={{
                    display: "grid",
                    gap: 8,
                    gridTemplateColumns: isMobile
                      ? "repeat(2, minmax(0, 1fr))"
                      : "repeat(4, minmax(0, 1fr))",
                  }}
                >
                  <SmallCard
                    label="TIR"
                    value={`${bonoData.tir_pct}%`}
                    sub="Rendimiento al vencimiento"
                  />
                  <SmallCard
                    label="Cupón"
                    value={`${bonoData.cupon_pct}%`}
                    sub="Tasa de interés anual"
                  />
                  <SmallCard
                    label="Duración"
                    value={`${bonoData.duracion_anios}a`}
                    sub="Sensibilidad a tasas"
                  />
                  {bonoData.paridad_pct && (
                    <SmallCard
                      label="Paridad"
                      value={`${bonoData.paridad_pct}%`}
                      sub="Precio sobre nominal"
                    />
                  )}
                </div>
              </div>
              <Divider />

              {bonoData.calificacion_crediticia && (
                <>
                  <Row label="Clasificación crediticia">
                    {(() => {
                      const b = creditBadge(bonoData.calificacion_crediticia);
                      return (
                        <span
                          style={{
                            display: "inline-block",
                            background: b.bg,
                            color: b.color,
                            fontWeight: 800,
                            fontSize: 15,
                            padding: "4px 14px",
                            borderRadius: 8,
                          }}
                        >
                          {b.label}
                        </span>
                      );
                    })()}
                  </Row>
                  <Divider />
                </>
              )}

              <Row label="Vencimiento">
                <span style={{ fontWeight: 800, color: C.dark }}>
                  {fmtDate(bonoData.vencimiento)}
                </span>
              </Row>
              <Divider />
              <Row label="Ley aplicable">
                <span style={{ fontWeight: 700 }}>{bonoData.ley}</span>
              </Row>
              <Divider />
              <Row label="Amortización">
                <span style={{ fontWeight: 700 }}>{bonoData.amortizacion}</span>
              </Row>
              <Divider />
              {bonoData.proximo_pago_cupon && (
                <>
                  <Row
                    label="Próximo pago de cupón"
                    sub={
                      bonoData.proximo_pago_monto_usd
                        ? `US$ ${bonoData.proximo_pago_monto_usd} por lámina de US$ 100`
                        : undefined
                    }
                  >
                    <span style={{ fontWeight: 800, color: C.dark }}>
                      {fmtDate(bonoData.proximo_pago_cupon)}
                    </span>
                  </Row>
                  <Divider />
                </>
              )}
              {instrumento === "on" && on_info?.garantia && (
                <>
                  <Row label="Garantía">
                    <span style={{ fontWeight: 700 }}>{on_info.garantia}</span>
                  </Row>
                  <Divider />
                </>
              )}
            </>
          )}

        {/* === LETRAS === */}
        {instrumento === "letra" && letra_info && (
          <>
            <Row
              label="Vencimiento"
              sub={`${letra_info.dias_al_vencimiento} días al vencimiento`}
            >
              <span style={{ fontWeight: 800, color: C.dark }}>
                {fmtDate(letra_info.vencimiento)}
              </span>
            </Row>
            <Divider />

            <Row label="Tipo de ajuste">
              <span
                style={{
                  background: C.light,
                  color: C.blue,
                  fontWeight: 800,
                  padding: "3px 12px",
                  borderRadius: 8,
                  fontSize: 13,
                }}
              >
                {letra_info.tipo_ajuste}
              </span>
            </Row>
            <Divider />

            <div style={{ padding: "14px 0" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#6B8EC8",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                  marginBottom: 10,
                }}
              >
                Rendimientos
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {letra_info.tna_pct && (
                  <SmallCard
                    label="TNA"
                    value={`${letra_info.tna_pct}%`}
                    sub="Tasa nominal anual"
                  />
                )}
                {letra_info.tea_pct && (
                  <SmallCard
                    label="TEA"
                    value={`${letra_info.tea_pct}%`}
                    sub="Tasa efectiva anual"
                  />
                )}
                {letra_info.tir_real_pct && (
                  <SmallCard
                    label="TIR Real"
                    value={`${letra_info.tir_real_pct}%`}
                    sub="Sobre inflación"
                  />
                )}
              </div>
            </div>
            <Divider />

            {letra_info.benchmark && (
              <>
                <Row label={`Comparado con ${letra_info.benchmark.tipo}`}>
                  <div
                    style={{ display: "flex", gap: 16, alignItems: "center" }}
                  >
                    {letra_info.benchmark.valor_pct != null && (
                      <div>
                        <div style={{ fontSize: 11, color: "#6B8EC8" }}>
                          {letra_info.benchmark.tipo}
                        </div>
                        <div style={{ fontSize: 16, fontWeight: 800 }}>
                          {letra_info.benchmark.valor_pct}%
                        </div>
                      </div>
                    )}
                    {letra_info.benchmark.spread_vs_benchmark_pct != null && (
                      <div>
                        <div style={{ fontSize: 11, color: "#6B8EC8" }}>
                          Spread
                        </div>
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 800,
                            color:
                              letra_info.benchmark.spread_vs_benchmark_pct >= 0
                                ? "#3B6D11"
                                : "#A32D2D",
                          }}
                        >
                          {letra_info.benchmark.spread_vs_benchmark_pct >= 0
                            ? "+"
                            : ""}
                          {letra_info.benchmark.spread_vs_benchmark_pct}%
                        </div>
                      </div>
                    )}
                  </div>
                </Row>
                <Divider />
              </>
            )}

            <Row label="Emisor">
              <span style={{ fontWeight: 700 }}>{general.emisor}</span>
            </Row>
            <Divider />
          </>
        )}

        {/* NOTICIAS */}
        {noticias && (
          <>
            <Row label="Últimas novedades">
              <span
                style={{
                  color: "#4A6E9A",
                  fontWeight: 400,
                  lineHeight: 1.65,
                  fontSize: 13,
                }}
              >
                {noticias}
              </span>
            </Row>
          </>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: "14px 18px 18px" }}>
        <a
          href={`https://app.cocos.capital/(auth)/(market)/${encodeURIComponent(id)}`}
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            textAlign: "center",
            background: C.blue,
            color: "#fff",
            borderRadius: 12,
            padding: "13px 0",
            textDecoration: "none",
            fontWeight: 800,
            fontSize: 14,
            fontFamily: font,
            letterSpacing: "0.01em",
          }}
        >
          Operar {ticker} →
        </a>
        <div
          style={{
            fontSize: 10,
            color: "#A8C4E8",
            textAlign: "center",
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          Datos ilustrativos · No constituye asesoramiento financiero
        </div>
      </div>
      {videoModalUrl && (
        <VideoModal
          videoUrl={videoModalUrl}
          onClose={() => setVideoModalUrl(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  const [seleccionados, setSeleccionados] = useState(
    obtenerSeleccionadosIniciales,
  );
  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const activosFiltrados = useMemo(
    () =>
      ACTIVOS.filter((a) => {
        if (tipoFiltro !== "todos" && a.instrumento !== tipoFiltro)
          return false;
        if (busqueda) {
          const q = busqueda.toLowerCase();
          return (
            a.general.ticker.toLowerCase().includes(q) ||
            a.general.nombre.toLowerCase().includes(q)
          );
        }
        return true;
      }),
    [tipoFiltro, busqueda],
  );

  const agregar = (id) => {
    if (!seleccionados.includes(id) && seleccionados.length < 3) {
      setSeleccionados([...seleccionados, id]);
      setBusqueda("");
    }
  };
  const quitar = (id) =>
    setSeleccionados(seleccionados.filter((x) => x !== id));

  const disponiblesParaAgregar = activosFiltrados.filter(
    (a) => !seleccionados.includes(a.id),
  );
  const activosSeleccionados = seleccionados
    .map((id) => ACTIVOS.find((a) => a.id === id))
    .filter(Boolean);

  const cols = isMobile
    ? "minmax(0,1fr)"
    : activosSeleccionados.length === 1
      ? "minmax(0,460px)"
      : activosSeleccionados.length === 2
        ? "repeat(2,minmax(0,1fr))"
        : "repeat(3,minmax(0,1fr))";

  return (
    <div
      style={{ minHeight: "100vh", background: "#EEF6FF", fontFamily: font }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
        {/* FILTROS */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            border: `1px solid ${C.light}`,
            padding: "18px",
            marginBottom: 24,
          }}
        >
          {/* Tipo de instrumento */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 14,
            }}
          >
            {TIPOS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTipoFiltro(t.id)}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  padding: "7px 16px",
                  borderRadius: 99,
                  cursor: "pointer",
                  fontFamily: font,
                  border: `1.5px solid ${tipoFiltro === t.id ? C.blue : C.light}`,
                  background: tipoFiltro === t.id ? C.blue : "#fff",
                  color: tipoFiltro === t.id ? "#fff" : C.navy,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {/* Buscador */}
            <div style={{ position: "relative", flex: "1", minWidth: 200 }}>
              <input
                style={{
                  width: "100%",
                  border: `1.5px solid ${C.light}`,
                  borderRadius: 12,
                  padding: "11px 14px",
                  fontSize: 14,
                  fontFamily: font,
                  color: C.dark,
                  outline: "none",
                  boxSizing: "border-box",
                  background: seleccionados.length >= 3 ? "#f5f7fa" : "#fff",
                }}
                placeholder="🔍 Buscá por ticker o nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                disabled={seleccionados.length >= 3}
              />
              {busqueda && disponiblesParaAgregar.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    zIndex: 20,
                    width: "100%",
                    marginTop: 4,
                    background: "#fff",
                    border: `1.5px solid ${C.light}`,
                    borderRadius: 14,
                    boxShadow: "0 8px 32px rgba(0,44,101,0.12)",
                    overflow: "hidden",
                    maxHeight: 280,
                    overflowY: "auto",
                  }}
                >
                  {disponiblesParaAgregar.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => agregar(a.id)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "10px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        background: "none",
                        border: "none",
                        borderBottom: `1px solid ${C.light}`,
                        cursor: "pointer",
                        fontFamily: font,
                      }}
                    >
                      <LogoImg
                        ticker={a.general.ticker}
                        emoji={a.general.logo_emoji}
                        size={32}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: C.dark,
                          }}
                        >
                          {a.general.ticker} · {a.general.nombre}
                        </div>
                        <div style={{ fontSize: 11, color: "#6B8EC8" }}>
                          {TIPO_LABELS[a.instrumento]} · {a.general.sector}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pills disponibles */}
          {seleccionados.length === 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
              }}
            >
              {disponiblesParaAgregar.slice(0, 12).map((a) => (
                <button
                  key={a.id}
                  onClick={() => agregar(a.id)}
                  style={{
                    fontSize: 12,
                    background: "#fff",
                    border: `1.5px solid ${C.light}`,
                    borderRadius: 99,
                    padding: "6px 14px",
                    cursor: "pointer",
                    color: C.navy,
                    fontWeight: 700,
                    fontFamily: font,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <LogoImg
                    ticker={a.general.ticker}
                    emoji={a.general.logo_emoji}
                    size={18}
                  />
                  {a.general.ticker}
                </button>
              ))}
              {disponiblesParaAgregar.length > 12 && (
                <span
                  style={{ fontSize: 12, color: "#6B8EC8", padding: "6px 0" }}
                >
                  +{disponiblesParaAgregar.length - 12} más
                </span>
              )}
            </div>
          )}
          {seleccionados.length >= 3 && (
            <p style={{ fontSize: 12, color: "#6B8EC8", margin: "10px 0 0" }}>
              Máximo 3 activos. Quitá uno para agregar otro.
            </p>
          )}
        </div>

        {/* TARJETAS */}
        {activosSeleccionados.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "80px 0", color: "#6B8EC8" }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
            <p style={{ fontWeight: 700, fontSize: 16 }}>
              Seleccioná un activo para ver su información
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 20,
              alignItems: "start",
              gridTemplateColumns: cols,
            }}
          >
            {activosSeleccionados.map((a) => (
              <Tarjeta
                key={a.id}
                activo={a}
                onRemove={quitar}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}

        <p
          style={{
            textAlign: "center",
            fontSize: 11,
            color: "#A8C4E8",
            marginTop: 40,
          }}
        >
          Demo · Datos ilustrativos · No constituye asesoramiento financiero ·
          Cocos Capital
        </p>
      </div>
    </div>
  );
}
