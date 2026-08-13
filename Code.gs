/**
 * Cole este arquivo em script.google.com e publique como Aplicativo da web.
 * Antes de publicar, substitua SPREADSHEET_ID pelo ID da sua planilha.
 */
const SPREADSHEET_ID = "199-8lOrCzgp3kQH1TbrhSmqLmVzEwUNIYw_0ddVnAZk";
const SHEET_NAME = "Confirmações";

function doPost(e) {
  const name = (e.parameter.name || "").trim();
  const submittedAt = e.parameter.submittedAt || new Date().toISOString();

  if (name.split(/\s+/).length < 2) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: "Nome completo obrigatório." }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(["Nome completo", "Confirmado em"]);
    sheet.getRange("A1:B1").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([name, new Date(submittedAt)]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
