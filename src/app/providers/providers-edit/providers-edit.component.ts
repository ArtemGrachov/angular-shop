import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersService } from '../../admin/users.service';
import { ProvidersService } from '../../providers/providers.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-providers-edit',
  templateUrl: './providers-edit.component.html'
})
export class ProvidersEditComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private providersService: ProvidersService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) { }

  provider: Provider = new Provider('0', '', '', '', '', [], 0, []);
  providerId: string;
  editMode: Boolean = false;
  providerForm: FormGroup;
  users: { id: string, name: string }[];

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (this.providerId = params['id']) {
          this.providersService.loadProvider(this.providerId).subscribe(
            res => {
              this.provider = res;
              this.buildProviderForm();
            }
          );
          this.editMode = true;
        } else {
          this.buildProviderForm();
        }
      }
    );
    this.usersService.loadUsers().subscribe(
      res => {
        this.users = res.map(user => {
          return { id: user.id, name: user.name };
        });
      }
    );
  }

  submit() {
    if (this.editMode) {
      this.providersService.updateProvider(this.providerForm.value).subscribe(
        () => this.router.navigate(['../'], { relativeTo: this.route })
      );
    } else {
      this.providersService.addProvider(this.providerForm.value).subscribe(
        () => this.router.navigate(['../'], { relativeTo: this.route })
      );
    }
  }

  buildProviderForm() {
    this.providerForm = this.fb.group({
      'id': [this.provider.id, Validators.required],
      'name': [this.provider.name, Validators.required],
      'logoUrl': [this.provider.logoUrl, Validators.required],
      'email': [this.provider.email, [Validators.required, Validators.email]],
      'users': [this.provider.users],
      'description': [this.provider.description, Validators.required],
      'rating': [this.provider.rating, Validators.required]
    });
  }

  reset() {
    this.providerForm.patchValue(this.provider);
  }

  delete() {
    this.providersService.deleteProvider(this.providerId).subscribe(
      () => {
        this.router.navigate(['providers']);
      }
    );
  }
}
