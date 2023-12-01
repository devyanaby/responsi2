import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-Tugas',
  templateUrl: './Tugas.page.html',
  styleUrls: ['./Tugas.page.scss'],
})
export class TugasPage implements OnInit {
  dataTugas: any = [];
  id: number | null = null;
  judul: string = '';
  deskripsi: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController,
    private router: Router  // Injeksi Router
  ) {}

  ngOnInit() {
    this.getTugas();
  }

  getTugas() {
    this._apiService.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataTugas = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  reset_model() {
    this.id = null;
    this.judul = '';
    this.deskripsi = '';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilTugas(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahTugas() {
    if (this.judul != '' && this.deskripsi != '') {
      let data = {
        judul: this.judul,
        deskripsi: this.deskripsi,
      };
      this._apiService.tambah(data, '/tambah.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah Tugas');
          this.getTugas();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah Tugas');
        },
      });
    } else {
      console.log('gagal tambah Tugas karena masih ada data yg kosong');
    }
  }

  hapusTugas(id: any) {
    this._apiService.hapus(id, '/hapus.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getTugas();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilTugas(id: any) {
    this._apiService.lihat(id, '/lihat.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let Tugas = hasil;
        this.id = Tugas.id;
        this.judul = Tugas.judul;
        this.deskripsi = Tugas.deskripsi;
      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editTugas() {
    let data = {
      id: this.id,
      judul: this.judul,
      deskripsi: this.deskripsi,
    };
    this._apiService.edit(data, 'edit.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getTugas();
        console.log('berhasil edit Tugas');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit Tugas ' + err.message);
      },
    });
  }

  logout() {
    // Lakukan proses logout seperti membersihkan token atau sesi yang ada
    // Misalnya, menghapus token dari localStorage
    localStorage.removeItem('token-saya');
    localStorage.removeItem('namasaya');

    // Redirect ke halaman login
    this.router.navigate(['/login']);
  }
}
