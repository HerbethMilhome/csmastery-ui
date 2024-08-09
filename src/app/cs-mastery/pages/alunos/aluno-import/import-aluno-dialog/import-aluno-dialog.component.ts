import { Component } from '@angular/core';
import { AppMaterialModule } from '../../../../../shared/app-material/app-material.module';
import { AlunoImportComponent } from "../aluno-import.component";

@Component({
  selector: 'app-import-aluno-dialog',
  standalone: true,
  imports: [AppMaterialModule, AlunoImportComponent],
  templateUrl: './import-aluno-dialog.component.html',
  styleUrl: './import-aluno-dialog.component.scss'
})
export class ImportAlunoDialogComponent {

}
