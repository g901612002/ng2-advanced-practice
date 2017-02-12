import { NgModule } from '@angular/core';
import { Route, Routes, RouterModule } from '@angular/router';
import { fallbackRoute } from './shared/fallback-route';

import { CardsComponent } from './cards/cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PreloadAllModules } from '@angular/router';

/**

<base href="/">
- 記住！一定要放在最前面！
- 不然資料的位置會隨著url改變而跑掉


Routes
- 是 Route 物件的集合 (陣列型態)
- 陣列中的物件是有順序性的 (每個Route(路由)順序很重要)
- 設定是否允許進入路由 (例如: 實作權限管理) 或是否允許離開路由
- 萬用路由(wildcardroute)：一定要放在最後 { path: '**', redirectTo: '/', pathMatch: 'full' }

Route
- Route = {path: 'xxx/:id',component: xxxComponent ,data: {}},
- 會有個path屬性代表網址路徑的片段(必要屬性)，不需要加上斜線開頭(/)
- 這裡的path屬性可以加上:參數名稱來代表一個路由參數
  - 只要有在path設定路由參數，網址列上就一定要出現該參數值。如果網址路徑沒有傳入路由參數，該路由會比對失敗。
  - 在 Component 中取得參數(載入：ActivatedRoute, Router)
  - 範例:{ path: 'hero/:id', component: HeroDetailComponent } 如果瀏覽器上的網址路徑為 /hero/33 時，路由參數 id 的值就會是 33
- 會有個data屬性，代表預計傳入元件的路由資料
- 路由參數是從網址路徑傳入ActivatedRoute物件
- 路由資料是從路由定義傳入ActivatedRoute物件
- 路由資料通常是唯讀/靜態的資料，例如頁面標題、權限角色、麵包屑...
- 動態的路由資料可以透過resolveguard來取得動態資料

Router 服務元件
- 可取得完整的路由資訊
  – config
  – events
  – navigated
- 可透過導覽 API 進行導覽
  – 絕對位址導覽
    - this.router.navigateByUrl('/home/1'); // 傳入字串
    - this.router.navigate(['home', '1']);
  – 相對位址導覽 (相對於目前的路由的網址路徑)
    - this.router.navigate(['..', '1'], {
        relativeTo: this.route
    });


Router 跟 Component 關係：
- Component 是不斷的實例化跟摧毀
- Router 是不斷的存在更新



Angular 2 元件生命週期
- 在不同的路由之間切換時
  – 路由所指向的元件會先 Destroy 舊的，然後 Create 新的
  – 每次切換路由時，都會執行一次ngOnInit事件
- 在相同的路由之間變換參數時
  – 在切換路由時，網址列雖然會變動，但依然是相同的路由
  – 由於路由並沒有切換 (只有參數變)，因此元件並不會重新產生新的
  – 由於元件並沒有產生新的，因此 ngOnInit 事件並不會重新執行!
  – 不會執行ngOnInit事件，該元件就沒有任何程式碼會自動執行!
  - 解決方案
    – 必須靠訂閱this.route.params這個Observable來偵測變更!



子路由
{ path: 'charts', (component)
children: [
  <<放置 Route 路由設定>>
  { path: 'flot', component: FlotComponent }
] }

可選的路由矩陣參數
- 類似QueryString的格式(但把?與&都改成;符號)
- 方法一
  - 格式
    http://localhost:4200/cards/1;name=Will;location=Taipei
  - 程式寫法 (傳入到 nagivate 方法第一個陣列參數的最後一個元素)
    this.router.navigate(['/cards', id, { name: 'Will', location: 'Taipei'
    }]);
  - html 寫法
    <a [routerLink]="['/cards', 1, {name: 'Will'}]">Card</a>
  - 取得參數
    - this.route.snapshot.params
    - this.route.params
- 方法二
  - 格式
    http://localhost:4200/cards/1?name=Will&location=Taipei
  - 程式寫法
    this.router.navigate(['cards', type], { queryParams: { ts: new Date().getTime() }
    });
  - html 寫法
    <a [routerLink]="['/cards', 1, {name: 'Will'}]" [queryParams]="{ page: 99 }">Card</a>
  - 取得參數
    - this.route.snapshot.queryParams
    - this.route.queryParams




如何取得上層路由的路由參數
- 無法從 ActivatedRoute 中去取得父層的 params
- 解決：
  this.username = this.route.parent.snapshot.params['params_name'];
- 範例：
  { path: 'product-details/:id', component: ProductDetails,
  children: [
  { path: '', component: Overview },
  { path: 'specs', component: Specs } // 選中的路由
  ] }
  product-details/3/specs 的 SpecsComponent ，無法取得 id 3
  要使用：this.router.routerState.parent(this.route).snapshot.params['id']


取消訂閱
- 範例
  parentParams$: Subscription;
  ngOnDestroy() {
    this.parentParams$.unsubscribe();
  }


RxJS 的 switchMap
- 從第一個 Observable 得到的值傳給 swtichMap，swtichMap 會先接到事件資料，並回傳一個新的 Observable 物件
- 優點：當 api 快速發兩個，會自動把前一個 api 給取消掉
- 範例
  this.route.params
      .switchMap((params: Params) => {
          return this.service.getHero(+params['id'])
      })
      .subscribe((hero: Hero) => this.hero = hero);



子路由模組：應用程式切割更多層功能模組
- 每個模組都各自擁有一個資料夾
- 每個模組都有自己的 Module 與 RoutingModule
- 每個模組都擁有一個預設路由，此路由也可以有預設元件與範本
- 預設元件的範本可以宣告自己這一層的<router-outlet>路由插座
- 建立新的 module
  - ng g m charts --routing (手動刪除多餘的 charts.component.* 檔案)


檢查：ng lint


模組載入機制
- 全部載入 (預設)
  透過 webpack 會將所有模組打包成 1 個 JS 檔案
- 延遲載入
  - 透過 webpack 將部分模組拆解成可延遲載入的程式片段 (chunks)
  - 當使用者點開網頁，所有可延遲載入的程式片段並不會預先載入
  - 主動擊進入特定路由，延遲載入的模組才會即時載入
- 預先載入
  - 透過 webpack 將部分模組拆解成可延遲載入的程式片段 (chunks)
  - 當使用者點開網頁，所有可延遲載入的程式片段會立即預先載入
  - 預先載入的過程透過非同步背景下載，不影響畫面顯示或使用者操作

延遲載入
- 必要條件
  - 原本的 AppModule 不能跟 子Module 有任何相依關係
  - import 要移除
- app-routing.module.ts
  { path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule'
  },
- 子-routing.module.ts
  把 { path: 'charts',childen 移除
- 執行：
  ng serve --prod

預先載入機制 (非同步載入)
- 必要條件
  - 原本的 AppModule 不能跟 子Module 有任何相依關係
  - import 要移除
- app-routing.module.ts
  import { PreloadAllModules } from '@angular/router';
  @NgModule({
  imports: [RouterModule.forRoot(routes, {
        enableTracing: true,
        preloadingStrategy: PreloadAllModules
      })],
      exports: [RouterModule],
      providers: []
    })

serviceWorker

 */


// 轉址：使用 redirectTo 時，一定要加上 patchMatch 屬性
// { path: '', redirectTo: '/home', pathMatch: 'full' },
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cards/:type', component: CardsComponent },
  { path: 'charts',
    loadChildren: './charts/charts.module#ChartsModule'
  },
  fallbackRoute
];


// 定義路由可以靠RouterModule.forRoot方法幫我們建立路由
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    // enableTracing: true
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
