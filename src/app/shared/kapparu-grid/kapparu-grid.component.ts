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
  }

  onRowDataChanged(params) {
    var allColIds = params.columnApi.getAllColumns()
      .map(column => column.colId);
    params.columnApi.autoSizeColumns(allColIds);
  }

  // Widths

  percentWidth = 100;
  dateWidth = 100;
  tickerWidth = 100;
  descriptionWidth = 200;

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
    headerName: 'CAGR5yr', field: 'cagr5yr', width: 100, cellStyle: params => {
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
    headerName: 'Annualized', field: 'marketNetReturnAnnualized', width: this.percentWidth, cellStyle: params => {
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

  colUpdateDate = {
    headerName: 'Date', field: 'date', width: this.dateWidth, cellStyle: params => {
      var now = new Date()
      var date = new Date(params.value)
      var diff = Math.abs(date.getTime() - now.getTime());
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      if (diffDays >= 90) {
        return { backgroundColor: "#F1948A" };
      }
      if (diffDays >= 30) {
        return { backgroundColor: "#F7DC6F" };
      }
      return null;
    }, valueFormatter: this.dateFormatter
  }

  colDate = {
    headerName: 'Date', field: 'date', width: this.dateWidth, valueFormatter: this.dateFormatter
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
      width: 100,
      cellStyle: this.cellStyleReturns,
      valueFormatter: this.percentFormatter
    }
  }

  colActual(field) {
    return {
      headerName: 'Actual', field: field, width: 70, cellStyle: params => {
        if (params.data['model'] > 0) {
          var diff = Math.abs(params.value - params.data['model']);
          var color = "#F1948A"
          if (diff < 0.02 && diff >= 0.01) {
            color = "#FADBD8"
          } else if (diff < 0.01) {
            color = "#D4EFDF"
          }
          return { textAlign: "right", backgroundColor: color };
        } else {
          return { textAlign: "right" };
        }
      }, valueFormatter: this.percentFormatter
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

  divisorFormatter(params) {
    return params.value.toLocaleString('en-US', {
      minimumFractionDigits: 8,
      maximumFractionDigits: 8
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

  transactionTypeFormatter(params) {
    switch (params.value) {
      case 1:
        return "Buy";
      case 2:
        return "Sell";
      case 3:
        return "Dividend";
    }
  }

  portfolioIdFormatter(params) {
    switch (params.value) {
      case 1:
        return "Total";
      case 2:
        return "Selfie";
      case 3:
        return "Oak";
      case 4:
        return "Managed";
      case 5:
        return "Risk Arb";
      case 6:
        return "Trade Fin";
      case 7:
        return "Quick";
      case 8:
        return "Portfolio";
      case 99:
        return "None";
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/