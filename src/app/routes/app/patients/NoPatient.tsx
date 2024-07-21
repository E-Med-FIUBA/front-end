export function NoPatientRoute() {
  return (
    <div className="hidden xl:flex xl:flex-col h-full bg-card rounded-md border col-span-3 justify-center items-center">
      <h3 className="text-lg font-semibold text-center">
        No hay paciente seleccionado
      </h3>
      <p className="text-sm text-muted-foreground">
        Seleccione uno a traves del menu de la izquierda, o presione el boton de
        "Agregar paciente" para crear uno nuevo.
      </p>
    </div>
  );
}
