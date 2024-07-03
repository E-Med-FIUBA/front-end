import { patientsMock } from "@/testing/mocks/patients";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "react-router-dom";

export function PatientDetailsRoute() {
  let { patientId } = useParams();

  if (!patientId) {
    throw new Error("No patient id provided");
  }

  const patient = patientsMock[parseInt(patientId) - 1];

  return (
    <div className="h-full col-span-4 xl:col-span-3 flex flex-col gap-4">
      <div className="bg-card rounded-md border p-2">
        <h2 className="text-xl font-semibold">
          {patient.firstName} {patient.lastName}
        </h2>

        <p className="text-sm mt-2">DNI: 12345678</p>
        <p className="text-sm mt-2">Edad: 25</p>
        <p className="text-sm mt-2">Fecha de nacimiento: 01/01/1996</p>
        <p className="text-sm mt-2">Sexo: Masculino</p>
        <p className="text-sm mt-2">Obra social: OSDE</p>
        <p className="text-sm mt-2">Ultima actualización: 01/01/2021</p>
        <p className="text-sm text-muted-foreground mt-2">patient@mail.com</p>
      </div>
      <ScrollArea className="bg-card rounded-md border flex-[1_1_0]">
        <div className="p-2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non
            arcu eget tortor convallis blandit eu id nulla. Vestibulum quam leo,
            consequat et ligula sit amet, posuere commodo urna. Phasellus a
            commodo risus. Donec ac mi nibh. Maecenas malesuada tortor ornare
            enim pretium, et aliquam elit fringilla. Curabitur tincidunt rhoncus
            malesuada. Sed sit amet nulla et tortor hendrerit dictum at et ante.
            Duis ornare lectus turpis, nec aliquet ante convallis pretium.
            Pellentesque semper feugiat dapibus. Vivamus lacinia, augue vitae
            pulvinar semper, nibh quam placerat dolor, sed ornare erat nulla vel
            ex. Proin volutpat vel orci et tempus. Maecenas mattis quam in
            lacinia pharetra. Duis efficitur arcu eu odio fermentum, iaculis
            varius nunc facilisis. Phasellus facilisis ac urna quis dapibus.
          </p>
          <p>
            Fusce vel viverra nunc. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Nam tristique consectetur
            risus, ac fermentum purus mollis quis. Donec laoreet malesuada elit
            sit amet pellentesque. Donec faucibus pulvinar tempus. Vestibulum
            ante nulla, malesuada sit amet ipsum a, ultricies rutrum est. Morbi
            pulvinar cursus mollis. In hac habitasse platea dictumst. Vivamus ac
            nisi et purus mattis varius. Nam turpis purus, suscipit eu urna sed,
            ultrices ullamcorper erat. Sed dapibus sodales urna, vel varius
            sapien vehicula nec. Praesent sapien mi, cursus ut diam eget,
            finibus sollicitudin risus. Maecenas id egestas ante. Nunc varius
            leo nec viverra finibus. Etiam ac diam imperdiet, cursus ligula vel,
            sagittis leo.
          </p>
          <p>
            Proin vitae tortor quis nulla rutrum hendrerit vel lobortis mauris.
            Vivamus dignissim mi at ligula bibendum hendrerit at eget nisl.
            Vestibulum imperdiet nibh sed ex dapibus aliquam eget ut erat. Nulla
            tincidunt diam eget erat blandit mattis. Pellentesque consectetur
            suscipit facilisis. Aenean laoreet lectus lectus, at ultricies
            lectus gravida vel. Donec commodo neque nec tellus ornare, nec
            egestas erat vulputate. Quisque tristique tincidunt ex et congue.
            Cras ex turpis, dictum quis orci et, hendrerit congue purus. Cras
            pretium sagittis eleifend. Nam lobortis erat sit amet ornare
            finibus. Morbi leo sapien, congue sit amet massa maximus,
            ullamcorper pharetra nisl. Nulla consequat feugiat nibh non
            vulputate. In consectetur convallis suscipit.
          </p>
          <p>
            Nullam non turpis velit. Nullam ut nulla enim. Nunc fermentum
            gravida turpis, mollis tempor orci feugiat id. Duis dictum mi ac
            varius porta. Vestibulum ornare elit eu eros egestas, a bibendum
            arcu venenatis. In a elementum turpis. Pellentesque ut risus nibh.
            Morbi venenatis faucibus ligula, sit amet condimentum arcu pulvinar
            ac. Proin tristique eget magna sed convallis. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Sed ultricies mauris eget erat finibus elementum.
            Suspendisse vel rhoncus massa.
          </p>
          <p>
            Nunc imperdiet ullamcorper facilisis. Vivamus sed nulla eget erat
            aliquam fringilla sed vel arcu. Donec erat dolor, accumsan non
            ultricies quis, viverra laoreet risus. Donec sit amet magna
            pellentesque, volutpat tortor ac, sodales nibh. Morbi aliquet metus
            non lacinia aliquam. Etiam ligula nulla, sagittis id justo vitae,
            pharetra sollicitudin arcu. Donec pharetra eget neque sed auctor.
            Vivamus maximus urna vel arcu sagittis, non gravida nulla placerat.
            Nunc sit amet vestibulum magna
          </p>
        </div>
      </ScrollArea>
    </div>
  );
}
