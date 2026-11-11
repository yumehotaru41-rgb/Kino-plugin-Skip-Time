# Time Skip 85s

Plugin de prueba para Kino: añade una pestaña al panel del reproductor con botones de salto fijo de **±85 segundos** (y ±30 s de apoyo).

## Qué hace

- Aparece como pestaña **Skip 85s** en el panel del reproductor de **cualquier título** (película o episodio de otros plugins).
- Los botones solo hacen `seekToMs` dentro del video actual.
- **No** saltan al siguiente episodio ni activan auto-next.
- Ideal para saltar intros/outros de duración fija (~85 s) sin usar el botón nativo “Saltar outro”.

## Instalación

1. En Kino → **Ajustes → Plugins**.
2. Instala desde la carpeta o el zip (o publica el repo con topic `kino-plugin`).
3. Activa el interruptor **«Mostrar en el reproductor»** de este plugin (consentimiento de `playerPanelTab`).
4. Reproduce cualquier título → abre el panel del reproductor → pestaña **Skip 85s**.

## Requisitos

- Kino 0.9.74+ (`apiVersion` 14)
- Capacidad `playerPanelTab` (aprobación del usuario)

## Autor

Hotaru Yume
