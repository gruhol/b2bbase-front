import { Component } from '@angular/core';
import { SocialLinkService } from '../social-link.service';
import { ConfirmDialogService } from '../../common/confirm-dialog/confirm-dialog.service';
import { Social } from '../dto/socjal';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrls: ['./social-link.component.scss']
})
export class SocialLinkComponent {
  socials: Array<Social> = [];
  messageError: string = "";

  constructor(
    private socialLinkService: SocialLinkService,
    private dialogService: ConfirmDialogService
    ) {}
  
  ngOnInit(): void {
    this.getSocials();
  }

  getSocials() {
    this.socialLinkService.getSocials().subscribe({
      next: response => {
        response.forEach(social => {
          this.socials.push(social);
        })  
      },
      error: error => {
        if( typeof(error.error.message) === 'string' ) {
          this.messageError = error.error.message;
        }
      }
    })
  }

  confirmDelete(element: Social) {
    this.dialogService.openConfirmDialog()
    .afterClosed()
    .subscribe(result => {
      
      if (result) {
        this.socialLinkService.deleteSocial(element.id)
        .subscribe(() => {
          this.socials.forEach((value, index) => {
            if(element == value) {
              this.socials.splice(index, 1);
            }
          })
        })
      }
    })
  }
}
