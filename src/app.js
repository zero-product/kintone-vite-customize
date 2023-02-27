import './style.css'
import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import dayjs from 'dayjs'
import Swal from 'sweetalert2';

kintone.events.on('app.record.index.show', (event) => {
  console.log(event);
});