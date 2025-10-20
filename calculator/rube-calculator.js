(function() {
    'use strict';
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalculator);
    } else {
        initCalculator();
    }
    
    function initCalculator() {
        const container = document.getElementById('rube-calculator');
        if (!container) {
            console.error('Rube Calculator: Container #rube-calculator not found');
            return;
        }
        
        // Create calculator HTML
        container.innerHTML = `
            <div class="rc-card">
                <h1 class="rc-title">간이 루베 계산기</h1>
                
                <div class="rc-form-group">
                    <label for="rc-length" class="rc-label">가로 (m)</label>
                    <input 
                        type="number" 
                        id="rc-length" 
                        class="rc-input" 
                        placeholder="예) 10"
                        step="0.01"
                        min="0"
                        aria-describedby="rc-length-error"
                    >
                    <span id="rc-length-error" class="rc-helper rc-helper-error" role="alert"></span>
                </div>
                
                <div class="rc-form-group">
                    <label for="rc-width" class="rc-label">세로 (m)</label>
                    <input 
                        type="number" 
                        id="rc-width" 
                        class="rc-input" 
                        placeholder="예) 5"
                        step="0.01"
                        min="0"
                        aria-describedby="rc-width-error"
                    >
                    <span id="rc-width-error" class="rc-helper rc-helper-error" role="alert"></span>
                </div>
                
                <div class="rc-form-group">
                    <label for="rc-thickness" class="rc-label">두께 (높이) (cm)</label>
                    <input 
                        type="number" 
                        id="rc-thickness" 
                        class="rc-input" 
                        placeholder="예) 20"
                        step="0.01"
                        min="0"
                        aria-describedby="rc-thickness-helper rc-thickness-error"
                    >
                    <span id="rc-thickness-helper" class="rc-helper rc-helper-info">두께가 20cm면 20을 입력</span>
                    <span id="rc-thickness-error" class="rc-helper rc-helper-error" role="alert"></span>
                </div>
                
                <div id="rc-result" class="rc-result rc-result-empty" role="status" aria-live="polite">
                    값을 입력하면 자동으로 계산됩니다
                </div>
                <div class="rc-disclaimer">
                    ※ 이 계산은 대략적인 값이며, 현장 상황에 따라 상이할 수 있습니다.
                </div>
                
                <div class="rc-button-group">
                    <button type="button" id="rc-reset-btn" class="rc-btn rc-btn-secondary">초기화</button>
                    <button type="button" id="rc-copy-btn" class="rc-btn rc-btn-success" disabled>복사</button>
                </div>
                
                <div id="rc-copy-feedback" class="rc-copy-feedback"></div>
            </div>
        `;
        
        // Get elements
        const lengthInput = document.getElementById('rc-length');
        const widthInput = document.getElementById('rc-width');
        const thicknessInput = document.getElementById('rc-thickness');
        const resultDiv = document.getElementById('rc-result');
        const resetBtn = document.getElementById('rc-reset-btn');
        const copyBtn = document.getElementById('rc-copy-btn');
        const copyFeedback = document.getElementById('rc-copy-feedback');
        
        const lengthError = document.getElementById('rc-length-error');
        const widthError = document.getElementById('rc-width-error');
        const thicknessError = document.getElementById('rc-thickness-error');
        
        let currentResult = null;
        
        // Validation function
        function validateInput(value, errorElement, inputElement) {
            const num = parseFloat(value);
            if (value === '' || value === null) {
                errorElement.textContent = '';
                inputElement.classList.remove('rc-error-input');
                return null;
            }
            if (isNaN(num) || num <= 0) {
                errorElement.textContent = '숫자를 입력해 주세요';
                inputElement.classList.add('rc-error-input');
                return null;
            }
            errorElement.textContent = '';
            inputElement.classList.remove('rc-error-input');
            return num;
        }
        
        // Calculate function
        function calculate() {
            const length = validateInput(lengthInput.value, lengthError, lengthInput);
            const width = validateInput(widthInput.value, widthError, widthInput);
            const thicknessCm = validateInput(thicknessInput.value, thicknessError, thicknessInput);
            
            if (length === null || width === null || thicknessCm === null) {
                resultDiv.textContent = '올바른 값을 입력해주세요';
                resultDiv.className = 'rc-result rc-result-empty';
                copyBtn.disabled = true;
                currentResult = null;
                return;
            }
            
            // Convert cm to m
            const thicknessM = thicknessCm / 100;
            
            // Calculate volume
            const volume = length * width * thicknessM;
            const volumeRounded = Math.round(volume * 100) / 100;
            
            currentResult = volumeRounded;
            resultDiv.textContent = `필요 루베: ${volumeRounded.toFixed(2)}`;
            resultDiv.className = 'rc-result';
            copyBtn.disabled = false;
        }
        
        // Reset function
        function reset() {
            lengthInput.value = '';
            widthInput.value = '';
            thicknessInput.value = '';
            
            lengthError.textContent = '';
            widthError.textContent = '';
            thicknessError.textContent = '';
            
            lengthInput.classList.remove('rc-error-input');
            widthInput.classList.remove('rc-error-input');
            thicknessInput.classList.remove('rc-error-input');
            
            resultDiv.textContent = '값을 입력하면 자동으로 계산됩니다';
            resultDiv.className = 'rc-result rc-result-empty';
            copyBtn.disabled = true;
            copyFeedback.textContent = '';
            currentResult = null;
        }
        
        // Copy function
        async function copyResult() {
            if (currentResult === null) return;
            
            try {
                const textToCopy = currentResult.toFixed(2);
                await navigator.clipboard.writeText(textToCopy);
                copyFeedback.textContent = '✓ 복사되었습니다!';
                setTimeout(() => {
                    copyFeedback.textContent = '';
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = currentResult.toFixed(2);
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    copyFeedback.textContent = '✓ 복사되었습니다!';
                    setTimeout(() => {
                        copyFeedback.textContent = '';
                    }, 2000);
                } catch (err) {
                    copyFeedback.textContent = '복사 실패';
                }
                document.body.removeChild(textArea);
            }
        }
        
        // Parse URL parameters
        function parseURLParams() {
            const params = new URLSearchParams(window.location.search);
            const length = params.get('length');
            const width = params.get('width');
            let thickness = params.get('thickness');
            const unit = params.get('unit');
            
            if (length) lengthInput.value = length;
            if (width) widthInput.value = width;
            if (thickness) {
                // Convert m to cm if unit is 'm' for backward compatibility
                if (unit === 'm') {
                    thickness = parseFloat(thickness) * 100;
                }
                thicknessInput.value = thickness;
            }
            
            // Auto-calculate if values are provided
            if (length || width || thickness) {
                calculate();
            }
        }
        
        // Event listeners
        lengthInput.addEventListener('input', calculate);
        widthInput.addEventListener('input', calculate);
        thicknessInput.addEventListener('input', calculate);
        
        resetBtn.addEventListener('click', reset);
        copyBtn.addEventListener('click', copyResult);
        
        // Initialize with URL parameters
        parseURLParams();
    }
})();

