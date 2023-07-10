import { scrollToElement } from '..'

describe('scroll-to', () => {
    it('be available', () => {
        expect(scrollToElement).toBeDefined()
    })

    it('scroll to element in its container and call callback when finished scrolling', (done) => {
        const node = document.createElement('div')
        document.body.appendChild(node)

        scrollToElement(node, {}, () => {
            expect(document.body.scrollTop).toBe(0)
            done()
        })
    })
})
