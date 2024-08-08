import { Component } from '@angular/core';
import * as ExcelJS from 'exceljs';

import { AppMaterialModule } from '../../../../shared/app-material/app-material.module';
import { AlunosService } from '../../../services/alunos.service';
import { Aluno } from './../../../model/aluno';
import { getFieldById } from './enums/field-enum';

@Component({
  selector: 'app-aluno-import',
  standalone: true,
  imports: [AppMaterialModule],
  templateUrl: './aluno-import.component.html',
  styleUrl: './aluno-import.component.scss'
})
export class AlunoImportComponent {

  constructor(
    private alunosService: AlunosService) {

  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      this.parseExcel(arrayBuffer);
    };

    fileReader.readAsArrayBuffer(file);
  }

  parseExcel(arrayBuffer: any): void {

    const workbook = new ExcelJS.Workbook();

    workbook.xlsx.load(arrayBuffer).then((workbook) => {
      let jsonData: any[] = [];
      workbook.eachSheet((worksheet, sheetId) => {
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          let rowData: any = {};
          row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            // rowData[`column${colNumber}`] = cell.value;
            let field = getFieldById(colNumber);
            rowData[`${field}`] = cell.value;
          });
          jsonData.push(rowData);
        });
      });

      let listaAluno = this.convertJsonToAlunos(JSON.stringify(jsonData, null, 2));
      this.alunosService.saveAlunoImport(listaAluno).subscribe({
        next: response => {
          console.log('Response from server:', response);
        },
        error: error => {
          console.error('Error:', error);
        }
      });
    });
  }

  convertJsonToAlunos(json: string): Aluno[] {
    const parsedJson = JSON.parse(json);
    return parsedJson.map((item: any) => ({
      nome: item.nome,
      telefone: item.telefone.toString() + '',
      email: typeof item.email === 'string' ? item.email : item.email.text
    }));
  }

}
