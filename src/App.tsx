import { useState } from 'react';

interface FundInput {
    monthlyExpenses: number;
    incomeStability: string;
    hasDependents: boolean;
    riskTolerance: string;
}

const FUND_TIPS: string[] = [
    'Keep emergency funds in a high-yield savings account for easy access',
    'Start with a goal of 1 month, then build up gradually',
    'Automate transfers to your emergency fund each payday',
    'Only use emergency funds for true emergencies — job loss, medical, repairs'
];

function App() {
    const [values, setValues] = useState<FundInput>({ monthlyExpenses: 3000, incomeStability: 'stable', hasDependents: false, riskTolerance: 'medium' });
    const handleChange = (field: keyof FundInput, value: string | number | boolean) => setValues(prev => ({ ...prev, [field]: value }));

    // Calculate recommended months
    let baseMonths = values.incomeStability === 'stable' ? 3 : 6;

    // Adjust for dependents
    if (values.hasDependents) {
        baseMonths += 2;
    }

    // Adjust for risk tolerance
    if (values.riskTolerance === 'low') {
        baseMonths += 2;
    } else if (values.riskTolerance === 'high') {
        baseMonths -= 1;
    }

    // Ensure minimum of 3 months
    const recommendedMonths = Math.max(3, baseMonths);
    const minimumMonths = 3;
    const idealMonths = recommendedMonths + 3;

    const recommendedFund = values.monthlyExpenses * recommendedMonths;
    const minimumFund = values.monthlyExpenses * minimumMonths;
    const idealFund = values.monthlyExpenses * idealMonths;

    const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return (
        <main style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <header style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
                <h1 style={{ marginBottom: 'var(--space-2)' }}>Emergency Fund Calculator (2026)</h1>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>Find your recommended savings coverage</p>
            </header>

            <div className="card">
                <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                    <div>
                        <label htmlFor="monthlyExpenses">Monthly Expenses ($)</label>
                        <input id="monthlyExpenses" type="number" min="500" max="50000" step="100" value={values.monthlyExpenses || ''} onChange={(e) => handleChange('monthlyExpenses', parseInt(e.target.value) || 0)} placeholder="3000" />
                    </div>
                    <div>
                        <label htmlFor="incomeStability">Income Stability</label>
                        <select id="incomeStability" value={values.incomeStability} onChange={(e) => handleChange('incomeStability', e.target.value)}>
                            <option value="stable">Stable (W-2, Salary)</option>
                            <option value="variable">Variable (Freelance, Commission, Gig)</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', backgroundColor: '#F8FAFC', borderRadius: 'var(--radius-md)' }}>
                        <input id="hasDependents" type="checkbox" checked={values.hasDependents} onChange={(e) => handleChange('hasDependents', e.target.checked)} />
                        <label htmlFor="hasDependents" style={{ margin: 0, cursor: 'pointer', flex: 1 }}>
                            <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>I have dependents</span>
                            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Children, elderly parents, or others relying on your income</span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor="riskTolerance">Risk Tolerance</label>
                        <select id="riskTolerance" value={values.riskTolerance} onChange={(e) => handleChange('riskTolerance', e.target.value)}>
                            <option value="low">Low — I want maximum security</option>
                            <option value="medium">Medium — Balanced approach</option>
                            <option value="high">High — I'm comfortable with less buffer</option>
                        </select>
                    </div>
                    <button className="btn-primary" type="button">Calculate Fund</button>
                </div>
            </div>

            <div className="card results-panel">
                <div className="text-center">
                    <h2 className="result-label" style={{ marginBottom: 'var(--space-2)' }}>Recommended Emergency Fund</h2>
                    <div className="result-hero">{fmt(recommendedFund)}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>{recommendedMonths} months of expenses</div>
                </div>
                <hr className="result-divider" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', textAlign: 'center' }}>
                    <div>
                        <div className="result-label">Minimum Fund</div>
                        <div className="result-value">{fmt(minimumFund)}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{minimumMonths} months</div>
                    </div>
                    <div style={{ borderLeft: '1px solid #BAE6FD', paddingLeft: 'var(--space-4)' }}>
                        <div className="result-label">Ideal Fund</div>
                        <div className="result-value" style={{ color: '#16A34A' }}>{fmt(idealFund)}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{idealMonths} months</div>
                    </div>
                </div>
            </div>

            <div className="card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
                <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-4)' }}>Emergency Fund Tips</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 'var(--space-3)' }}>
                    {FUND_TIPS.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-primary)', flexShrink: 0 }} />{item}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="ad-container"><span>Advertisement</span></div>

            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                    <h3 style={{ fontSize: '1rem' }}>Savings Breakdown</h3>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Category</th>
                            <th style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', color: 'var(--color-text-secondary)' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>Monthly Expenses</td>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', fontWeight: 500 }}>{fmt(values.monthlyExpenses)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: '#F8FAFC' }}>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>Coverage Months</td>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', fontWeight: 500 }}>{recommendedMonths} months</td>
                        </tr>
                        <tr>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-primary)', fontWeight: 600 }}>Total Savings Target</td>
                            <td style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'right', fontWeight: 700, color: '#0C4A6E' }}>{fmt(recommendedFund)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div style={{ maxWidth: 600, margin: '0 auto', fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                <p>This calculator provides estimates for recommended emergency fund amounts based on your monthly expenses, income stability, dependents, and risk tolerance. General guidelines suggest 3-6 months of expenses, though individual situations vary. These figures are estimates only and should not replace personalized financial planning. Consider consulting a financial advisor for guidance tailored to your specific circumstances.</p>
            </div>

            <footer style={{ textAlign: 'center', padding: 'var(--space-8) var(--space-4)', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', marginTop: 'var(--space-8)' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-4)', fontSize: '0.875rem' }}>
                    <li>• Estimates only</li><li>• Not financial advice</li><li>• Free to use</li>
                </ul>
                <nav style={{ marginTop: 'var(--space-4)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
                    <a href="https://scenariocalculators.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Privacy Policy</a>
                    <span style={{ color: '#64748B' }}>|</span>
                    <a href="https://scenariocalculators.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#94A3B8', fontSize: '0.75rem' }}>Terms of Service</a>
                </nav>
                <p style={{ marginTop: 'var(--space-4)', fontSize: '0.75rem' }}>&copy; 2026 Emergency Fund Calculator</p>
            </footer>

            <div className="ad-container ad-sticky"><span>Advertisement</span></div>
        </main>
    );
}

export default App;
