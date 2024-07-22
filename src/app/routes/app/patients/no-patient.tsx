export function NoPatientRoute() {
  return (
    <div className="col-span-3 hidden h-full items-center justify-center rounded-md border bg-card xl:flex xl:flex-col">
      <h3 className="text-center text-lg font-semibold">
        No hay paciente seleccionado
      </h3>
      <p className="text-sm text-muted-foreground">
        Seleccione uno a traves del menu de la izquierda, o presione el boton de
        &quot;Agregar paciente&quot; para crear uno nuevo.
      </p>
    </div>
  );
}
