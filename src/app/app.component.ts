import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}


@Component({
  template: `
< h1 mat - dialog - title color = "warn" > Ocorreu um erro! < /h1>
  < div mat - dialog - content >
  <p>{{ data }} </p>
  < /div>
<div mat - dialog - actions >
  <Span class="span-spacer" > </Span>
  < button mat - button(click)="closeDialog()" color - "warn" > Fechar < /button>
  < /div>
  `
})

export class ErrorDetailComponent {
  constructor(public dialogRef: MatDialogRef<ErrorDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data) { }

  closeDialog() {
    this.dialogRef.close();
  }
}