import { Component, OnInit } from '@angular/core';
// ActivatedRoute, Router 基本上是一起被載入
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  type: string;

  constructor(private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    /**
     * snapshot (快照)
     * 取得執行當下的參數值 (僅初始值)
     *
     * this.type = this.route.snapshot.params['type'];
     */

    /**
     * params  (比較常用)
     * route.params 是一個 Observable 物件
     * 用 Observable 物件來取得參數值
     */

    this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }

  goCards(_type) {
    /**
     * 正常寫法
     * 1.
     * this.router.navigate(['cards', _type]);
     *
     * 2.
     * this.router.navigateByUrl('/cards/' + _type);
     *
     * 3. 相對連結
     * this.router.navigate(['..', '1'], {
     *  relativeTo: this.route
     * });
     */
    this.router.navigate(['../cards', _type]);
  };

}
