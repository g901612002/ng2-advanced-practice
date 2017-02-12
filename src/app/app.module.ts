import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';


/**
 * imports Module
 * 自定義的 Module 要擺在 AppRoutingModule 之前
 * 不然再載入順序會排在最後
 * 模組匯入的順序很重要 (路由是依序套用的)
 * AppRoutingModule必須被放在最後載入!
 *
 * Module 的 routing 處理
 * 在網址上會比對url
 * 先在 ChartsModuleRouter做比對
 * 如果沒有，再去 AppRoutingModule 去做比對
 */

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
