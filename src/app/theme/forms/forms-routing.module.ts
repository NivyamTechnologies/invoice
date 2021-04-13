import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forms Components',
      status: false
    },
    children: [
      {
        path: 'basic',
        loadChildren: './basic-elements/basic-elements.module#BasicElementsModule'
      },
      {
        path: 'add-on',
        loadChildren: './add-on/add-on.module#AddOnModule'
      },
      {
        path: 'item',
        loadChildren: './item/item.module#ItemModule'
      },
      {
        path: 'itemreport',
        loadChildren: './itemreport/itemreport.module#ItemreportModule'
      },
      {
        path: 'purchase',
        loadChildren: './purchase/purchase.module#PurchaseModule'
      },
      {
        path: 'party',
        loadChildren: './party/party.module#PartyModule'
      },
      {
        path: 'partyreport',
        loadChildren: './partyreport/partyreport.module#PartyreportModule'
      },
      {
        path: 'purchasereport',
        loadChildren: './purchasereport/purchasereport.module#PurchasereportModule'
      },
      {
        path: 'advance',
        loadChildren: './advance-elements/advance-elements.module#AdvanceElementsModule'
      },
      {
        path: 'validation',
        loadChildren: './form-validation/form-validation.module#FormValidationModule'
      },
      {
        path: 'picker',
        loadChildren: './form-picker/form-picker.module#FormPickerModule'
      },
      {
        path: 'select',
        loadChildren: './form-select/form-select.module#FormSelectModule'
      },
      {
        path: 'form-wizards',
        loadChildren: './form-wizards/form-wizards.module#FormWizardsModule'
      },
      {
        path: 'ngx',
        loadChildren: './ngx-wizard/ngx-wizard.module#NGXFormWizardModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule { }
