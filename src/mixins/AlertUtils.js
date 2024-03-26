
export const AlertUtils = {
    data() {
      return {
      };
    },
    methods: {
      alertSucces(message = 'Data berhasil ditemukan!') {
          const Toast = this.$swal.mixin({
              toast: true,
              background: '#2d2d2d',
              color: "#ffffff",
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: message
          });
      },
      alertDefault(position = 'top-right', title = 'Pemberitahuan!', text = '', color = null){
        this.$vs.notification({
          color,
          position,
          title,
          text
        })
      },
      alertWarning(message = 'Peringatan!') {
          const Toast = this.$swal.mixin({
              toast: true,
              background: '#2d2d2d',
              color: "#ffffff",
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'warning',
              title: message
          });
      },
      alertInfo(message = 'Peringatan!') {
          const Toast = this.$swal.mixin({
              toast: true,
              background: '#2d2d2d',
              color: "#ffffff",
              position: 'top',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'info',
              title: message
          });
      },
      alertError(message = 'Data gagal ditemukan!') {
        const Toast = this.$swal.mixin({
            toast: true,
            background: '#2d2d2d',
            color: "#ffffff",
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', this.$swal.stopTimer)
              toast.addEventListener('mouseleave', this.$swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: message
        });
    }
    }
  
  }