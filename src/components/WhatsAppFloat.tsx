export default function WhatsAppFloat() {
  const message = encodeURIComponent("Hola Jorge, vi tu portafolio JORGE LAB y quisiera conversar sobre un proyecto.");
  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/584129365637?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar a Jorge por WhatsApp"
      title="WhatsApp"
    >
      <span>WA</span>
      <b>WhatsApp</b>
    </a>
  );
}
