# Lala Lounge — web

Web estática del restaurante **Lala Lounge** (C. Candelaria, 22 · 38003 Santa Cruz de Tenerife).
Sin dependencias ni paso de compilación: Vercel la publica tal cual.

## Estructura

```
index.html              Página única: portada, experiencia, carta, galería, reservas y contacto
assets/css/styles.css   Estilos (colores y tipografías en las variables de :root)
assets/js/main.js       Datos del restaurante, carta, galería, formulario de reservas
assets/img/             Fotografías reales, logo y favicon
vercel.json             Caché de los recursos estáticos
```

## Datos pendientes

Al principio de `assets/js/main.js` está el objeto `CONFIG`. Rellena lo que falte:

| Campo       | Ejemplo                    | Efecto                                                       |
|-------------|----------------------------|--------------------------------------------------------------|
| `telefono`  | `"+34 922 000 000"`        | Aparece en contacto                                          |
| `whatsapp`  | `"34600000000"`            | Las reservas se envían por WhatsApp al restaurante           |
| `email`     | `"reservas@…"`             | Aparece en contacto y en el aviso de reserva                 |
| `horario`   | `"Mar–Dom · 13:00–00:00"`  | Aparece en contacto                                          |
| `instagram` | `"usuario"` (sin @)        | Enlace al perfil                                             |

Mientras `whatsapp` esté vacío, el formulario **no envía** la reserva: muestra un resumen marcado como
pendiente de confirmación para copiarlo.

## Carta

La carta está en el objeto `MENU` de `assets/js/main.js`, transcrita de las fotografías de la carta impresa.
Las entradas con `chk:1` se muestran como *por confirmar* porque no se leían con claridad:
Mejillones (precio), Krug (precio), Nogora Verdejo, Vaquos Verdejo, Maeste Alma del Vivar,
La Fleur Vivaltus y Priorat (nombres). Al confirmarlas, corrige el texto y quita `chk:1`.

## Publicar en Vercel

1. vercel.com → **Add New → Project** → importar este repositorio.
2. Framework preset: **Other**. Sin comando de build ni directorio de salida.
3. **Deploy**. Cada `git push` a `main` vuelve a publicar la web.
