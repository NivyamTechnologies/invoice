import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {transition, trigger, style, animate} from '@angular/animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [
    './modal.component.scss',
    '../../../../../../node_modules/sweetalert2/src/sweetalert2.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {
  showDialog = false;
  @Input() visible: boolean;
  public config: any;

  constructor() {}

  ngOnInit() {
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  openBasicModal(event) {
    this.showDialog = !this.showDialog;
    setTimeout(() => {
      document.querySelector('#' + event).classList.add('md-show');
    }, 25);
  }

  closeBasicModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
    setTimeout(() => {
      this.visible = false;
      this.showDialog = !this.showDialog;
    }, 300);
  }

  openSwal() {
    Swal({
      title: 'Error!',
      text: 'Do you want to continue',
      type: 'error',
      confirmButtonText: 'Cool',
      allowOutsideClick: true
    }).catch(Swal.noop);
  }

  openBasicSwal() {
    Swal({
      title: 'Heres a message!',
      text: 'Its pretty, isnt it?'
    }).catch(Swal.noop);
  }

  openSuccessSwal() {
    Swal({
      title: 'Good job!',
      text: 'You clicked the button!',
      type: 'success'
    }).catch(Swal.noop);
  }

  openConfirmsSwal() {
    Swal({
      title: 'Are you sure?',
      text: 'You wont be able to revert',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      }
    });
  }

  openSuccessCancelSwal() {
    Swal({
      title: 'Are you sure?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        Swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
      } else if (result.dismiss) {
        Swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }

  openPromptSwal() {
    Swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    });

    const steps = [
      {
        title: 'Question 1',
        text: 'Chaining Swal2 modals is easy'
      },
      'Question 2',
      'Question 3'
    ];

    Swal.queue(steps).then((result) => {
      Swal.resetDefaults();

      if (result.value) {
        Swal({
          title: 'All done!',
          html:
          'Your answers: <pre>' +
          JSON.stringify(result.value) +
          '</pre>',
          confirmButtonText: 'Lovely!'
        });
      }
    });
  }

  openAjaxSwal() {
    Swal({
      title: 'Submit email to run ajax request',
      input: 'email',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (email === 'taken@example.com') {
              Swal.showValidationError(
                'This email is already taken.'
              );
            }
            resolve();
          }, 2000);
        });
      },
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        Swal({
          type: 'success',
          title: 'Ajax request finished!',
          html: 'Submitted email: ' + result.value
        });
      }
    });
  }

}
