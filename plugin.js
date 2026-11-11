/**
 * Time Skip 85s — pestaña aportada al panel del reproductor.
 * Botones +85 s / −85 s que solo mueven la posición del video actual.
 * No activa auto-next ni salta al siguiente episodio.
 */

const SKIP_MS = 85_000;

function formatTime(ms) {
  if (ms == null || !Number.isFinite(ms) || ms < 0) return "—";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${m}:${String(s).padStart(2, "0")}`;
}

export async function panel(context) {
  const pos = context.positionMs ?? 0;
  const dur = context.durationMs;
  const paused = context.paused === true;
  const en = (context.lang || "").startsWith("en");

  const statusLine = en
    ? `${paused ? "Paused" : "Playing"} · ${formatTime(pos)}${dur != null ? " / " + formatTime(dur) : ""}`
    : `${paused ? "Pausado" : "Reproduciendo"} · ${formatTime(pos)}${dur != null ? " / " + formatTime(dur) : ""}`;

  return {
    title: en ? "Time Skip 85s" : "Time Skip 85s",
    titleEn: "Time Skip 85s",
    accent: "#39C5BB",
    refreshMs: 3000,
    elements: [
      {
        type: "status",
        text: statusLine,
      },
      {
        type: "section",
        title: en ? "Fixed jump" : "Salto fijo",
        text: en
          ? "Moves the playhead by exactly 85 seconds inside the same video. Does not go to the next episode."
          : "Mueve la posición exactamente 85 segundos dentro del mismo video. No pasa al siguiente episodio.",
      },
      {
        type: "row",
        gap: "medium",
        children: [
          {
            type: "button",
            key: "back85",
            label: en ? "−85 s" : "−85 s",
          },
          {
            type: "button",
            key: "fwd85",
            label: en ? "+85 s" : "+85 s",
          },
        ],
      },
      {
        type: "row",
        gap: "medium",
        children: [
          {
            type: "button",
            key: "back30",
            label: en ? "−30 s" : "−30 s",
          },
          {
            type: "button",
            key: "fwd30",
            label: en ? "+30 s" : "+30 s",
          },
        ],
      },
      {
        type: "text",
        text: en
          ? "Tip: open this tab while watching any title. The buttons only seek; they never trigger next-episode."
          : "Consejo: abre esta pestaña mientras ves cualquier título. Los botones solo buscan; nunca activan el siguiente episodio.",
      },
    ],
  };
}

export async function panelAction(event, context) {
  if (event.trigger !== "press") return null;

  const pos = Number(context.positionMs) || 0;
  const dur = context.durationMs != null ? Number(context.durationMs) : null;

  let delta = 0;
  if (event.key === "fwd85") delta = SKIP_MS;
  else if (event.key === "back85") delta = -SKIP_MS;
  else if (event.key === "fwd30") delta = 30_000;
  else if (event.key === "back30") delta = -30_000;
  else return null;

  let target = pos + delta;
  if (target < 0) target = 0;
  if (dur != null && Number.isFinite(dur) && dur > 0) {
    // Deja 1 s de margen para no disparar ended por error
    target = Math.min(target, Math.max(0, dur - 1000));
  }

  return {
    player: {
      seekToMs: Math.round(target),
    },
  };
}
