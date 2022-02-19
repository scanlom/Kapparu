import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-kapparu-grid',
  templateUrl: './kapparu-grid.component.html',
})
export class KapparuGridComponent {
  constructor() {
  }

  onGridReady(params) {
    params.api.setHeaderHeight(25);
    var allColIds = params.columnApi.getAllColumns()
      .map(column => column.colId);
    params.columnApi.autoSizeColumns(allColIds);
  }

  onRowDataChanged(params) {
    this.onGridReady(params)
  }

  // Columns

  colConfidence = {
    headerName: 'Confidence', field: 'confidence', cellStyle: params => {
      switch (params.value) {
        case 'H':
          return { backgroundColor: '#7DCEA0' };
        case 'M':
          return { backgroundColor: '#F7DC6F' };
        case 'B':
          return { backgroundColor: '#B2BABB' };
        case 'L':
          return { backgroundColor: '#F1948A' };
      }
      return null;
    }
  }

  colCAGR5yr = {
    headerName: 'CAGR5yr', field: 'cagr5yr', cellStyle: params => {
      var color = "#F1948A"
      if (params.value < 0.05 && params.value >= 0) {
        color = "#FADBD8"
      } else if (params.value < 0.10 && params.value >= 0.05) {
        color = "#D4EFDF"
      } else if (params.value >= 0.10) {
        color = "#7DCEA0"
      }
      return { textAlign: "right", backgroundColor: color };
    }, valueFormatter: this.percentFormatter
  }

  colMergersNetAnnualized = {
    headerName: 'Annualized', field: 'marketNetReturnAnnualized', cellStyle: params => {
      var color = "#F1948A"
      if (params.value < 0.04 && params.value >= 0.02) {
        color = "#FADBD8"
      } else if (params.value < 0.06 && params.value >= 0.04) {
        color = "#D4EFDF"
      } else if (params.value >= 0.06) {
        color = "#7DCEA0"
      }
      return { textAlign: "right", backgroundColor: color };
    }, valueFormatter: this.percentFormatter
  }

  colProjectionsDate = {
    headerName: 'Date', field: 'date', cellStyle: params => {
      var now = new Date()
      var date = new Date(params.value)
      console.log(typeof params.value)
      var diff = Math.abs(date.getTime() - now.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      console.log(diffDays)
      if (diffDays >= 90) {
        return { backgroundColor: "#F1948A" };
      }
      if (diffDays >= 30) {
        return { backgroundColor: "#F7DC6F" };
      }
      return null;
    }, valueFormatter: this.dateFormatter
  }

  cellStyleReturns = params => {
    var color = "#F1948A"
    if (params.value < 0.00 && params.value >= -0.02) {
      color = "#FADBD8"
    } else if (params.value < 0.07 && params.value >= 0.00) {
      color = "#D4EFDF"
    } else if (params.value >= 0.07) {
      color = "#7DCEA0"
    }
    return { textAlign: "right", backgroundColor: color };
  }

  colReturns(headerName, field) {
    return {
      headerName: headerName, 
      field: field, 
      cellStyle: this.cellStyleReturns,
      valueFormatter: this.percentFormatter
    }
  }

  // Formatters

  numberFormatter(params) {
    return params.value.toLocaleString();
  }

  currencyFormatter(params) {
    return params.value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  percentFormatter(params) {
    return String((params.value * 100).toFixed(2)) + "%";
  }

  percentIntFormatter(params) {
    return String((params.value * 100).toFixed(0)) + "%";
  }

  dateFormatter(params) {
    return moment(params.value).format('YYYY-MM-DD');
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/