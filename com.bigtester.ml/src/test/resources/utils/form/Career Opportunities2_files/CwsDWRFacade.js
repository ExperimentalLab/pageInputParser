
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (CwsDWRFacade == null) var CwsDWRFacade = {};
CwsDWRFacade._path = '/chj03/ats/dwr-cws';
CwsDWRFacade.refreshSession = function(callback) {
  dwr.engine._execute(CwsDWRFacade._path, 'CwsDWRFacade', 'refreshSession', false, callback);
}
CwsDWRFacade.signForm = function(p0, p1, p2, callback) {
  dwr.engine._execute(CwsDWRFacade._path, 'CwsDWRFacade', 'signForm', p0, p1, p2, false, callback);
}
CwsDWRFacade.removeJobAlert = function(p0, callback) {
  dwr.engine._execute(CwsDWRFacade._path, 'CwsDWRFacade', 'removeJobAlert', p0, false, callback);
}
CwsDWRFacade.getCWSFormToken = function(callback) {
  dwr.engine._execute(CwsDWRFacade._path, 'CwsDWRFacade', 'getCWSFormToken', false, callback);
}
CwsDWRFacade.declineOffer = function(p0, p1, p2, callback) {
  dwr.engine._execute(CwsDWRFacade._path, 'CwsDWRFacade', 'declineOffer', p0, p1, p2, false, callback);
}
CwsDWRFacade.checkPasswordUpdateCandidateEmail = function(p0, p1, p2, p3, p4, callback) {
  dwr.engine._execute(CwsDWRFacade._path, 'CwsDWRFacade', 'checkPasswordUpdateCandidateEmail', p0, p1, p2, p3, p4, false, callback);
}
CwsDWRFacade.getWFHTML = function(p2, p3, callback) {
  dwr.engine._execute(CwsDWRFacade._path, 'CwsDWRFacade', 'getWFHTML', false, false, p2, p3, callback);
}
