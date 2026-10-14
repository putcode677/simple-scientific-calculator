// src/utils/engine.js

export const evaluateExpression = (expr, isDegree) => {
  try {
    if (!expr) return '';
    let sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/');
    sanitized = sanitized.replace(/π/g, `(${Math.PI})`).replace(/e/g, `(${Math.E})`);

    const powerRegex = /([0-9.]+|\([^()]+ text-h\)?)\^([0-9.]+|\([^()]+\))/g;
    while (sanitized.includes('^')) {
      let updated = sanitized.replace(powerRegex, 'Math.pow(\$1,\$2)');
      if (updated === sanitized) break;
      sanitized = updated;
    }

    const angleMultiplier = isDegree ? `* (${Math.PI} / 180)` : '';
    sanitized = sanitized.replace(/sin\(/g, `Math.sin(`).replace(/cos\(/g, `Math.cos(`).replace(/tan\(/g, `Math.tan(`);

    if (isDegree) {
      sanitized = sanitized.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, 'Math.\$1((\$2) ' + angleMultiplier + ')');
    }

    sanitized = sanitized.replace(/log\(/g, 'Math.log10(').replace(/ln\(/g, 'Math.log(').replace(/sqrt\(/g, 'Math.sqrt(');

    const compute = new Function(`return ${sanitized}`);
    const evalResult = compute();

    if (evalResult === null || isNaN(evalResult) || !isFinite(evalResult)) return 'Error';

    return Number(evalResult.toFixed(8)).toString();
  } catch (err) {
    return 'Error';
  }
};
