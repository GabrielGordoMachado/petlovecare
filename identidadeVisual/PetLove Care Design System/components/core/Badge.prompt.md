Status pill for the appointment lifecycle, or a neutral/brand tag.

```jsx
<Badge status="agendado" />        {/* → "Agendado" blue */}
<Badge status="finalizado" />      {/* → "Finalizado" green */}
<Badge tone="coral">Novo</Badge>
```

Statuses: `agendado` (blue) · `em_andamento` (amber) · `finalizado` (green) · `cancelado` (red). Auto-labels in pt-BR when no children.
