import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserAnimationsModule, AccordionModule.forRoot()],
})
export class BootstrapModule {}
