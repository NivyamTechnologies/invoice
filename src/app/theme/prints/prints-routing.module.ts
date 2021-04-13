import {NgModule} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import { InvoiceComponent } from './invoice/invoice.component'

const routes : Routes = [{
    path : '',
    children : [
        {
            path : 'invoice',
            component : InvoiceComponent,
            data : {
                title : 'Invoice',
                icon : 'ti-layers',
                status : true
            }
        }
    ]
}]

@NgModule({
    imports : [RouterModule.forChild(routes)],
    exports : [RouterModule]
})

export class PrintRoutingModule{}