import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ProvidersService } from '../../providers/providers.service';

import { Provider } from '../../shared/models/provider.model';

@Component({
  selector: 'app-providers-edit',
  templateUrl: './providers-edit.component.html',
  styleUrls: ['./providers-edit.component.css']
})
export class ProvidersEditComponent implements OnInit {
  provider: Provider = new Provider(
    '0',
    '',
    '',
    '',
    '',
    [0]
  );
  providerId: string;
  editMode: Boolean = false;
  providerForm: FormGroup;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public providersService: ProvidersService,
    public fb: FormBuilder

  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (this.providerId = params['id']) {
          this.provider = this.providersService.getProvider(this.providerId);
          this.editMode = true;
        }
      }
    );
    this.buildProviderForm();
  }

  submit() {
    if (this.editMode) {
      this.providersService.updateProvider(this.providerForm.value);
    } else {
      this.providersService.addProvider(this.providerForm.value);
    }
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  buildProviderForm() {
    this.providerForm = this.fb.group({
      'id': this.provider.id,
      'name': this.provider.name,
      'logoUrl': this.provider.logoUrl,
      'email': this.provider.email,
      'description': this.provider.description
    });
  }

  reset() {
    this.providerForm.patchValue(this.provider);
  }

  delete() {
    this.providersService.deleteProvider(this.providerId);
    this.router.navigate(['providers']);
  }
}